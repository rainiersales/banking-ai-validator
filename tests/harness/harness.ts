#!/usr/bin/env node

/**
 * Meridian Banking Chatbot Test Harness
 * Orchestrates test execution, scoring, and reporting
 */

import fs from "node:fs";
import path from "node:path";
import { ChatClient } from "./chat-client";
import { ChatbotScorer, type ScorerResult } from "./scorer";

interface TestCase {
  id: string;
  category: string;
  title: string;
  prompt?: string;
  prompt_sequence?: string[];
  expected_contains?: string[];
  expected_not_contains?: string[];
  expected_latency_ms?: number;
  rationale: string;
  scorer_type: "rule_based" | "mixed" | "llm_as_judge";
  rules?: Record<string, unknown>[];
  llm_criteria?: Record<string, unknown>;
}

interface ExecutionResult {
  test_id: string;
  category: string;
  title: string;
  scorer_result: ScorerResult;
  raw_response?: string; // Raw message from chatbot for diagnostics
  error?: string;
}

class TestHarness {
  private client: ChatClient;
  private scorer: ChatbotScorer;
  private testCases: TestCase[] = [];
  private results: ExecutionResult[] = [];
  private verbose: boolean = false;
  private filter?: string;

  constructor(baseUrl: string, token: string, sessionId: string) {
    this.client = new ChatClient(baseUrl, token, sessionId);
    this.scorer = new ChatbotScorer();
  }

  async loadTestCases(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(content);
      this.testCases = data.test_cases;
      console.log(`✓ Loaded ${this.testCases.length} test cases`);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`✗ Failed to load test cases: ${errorMsg}`);
      process.exit(1);
    }
  }

  setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }

  setFilter(filter: string): void {
    this.filter = filter;
  }

  private shouldRunTest(testCase: TestCase): boolean {
    if (!this.filter) return true;
    return (
      testCase.id.includes(this.filter) ||
      testCase.category.includes(this.filter)
    );
  }

  /**
   * Warm-up: check session state before tests.
   * Logs raw response for diagnostics if session is inactive.
   */
  private async warmUp(): Promise<void> {
    console.log("🔄 Warm-up: Checking session state...");
    try {
      const stateResponse = await this.client.getState();
      if (this.verbose) {
        console.log(
          "   Session state:",
          JSON.stringify(stateResponse, null, 2),
        );
      }
      if (!stateResponse.account) {
        console.warn(
          "   ⚠️  Session appears inactive (no account data). Tests may fail.",
        );
      } else {
        console.log("   ✓ Session active");
      }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.warn(`   ! Could not verify session: ${errorMsg}`);
    }
  }

  async executeTests(): Promise<void> {
    // Warm-up first
    await this.warmUp();

    const applicableTests = this.testCases.filter((t) => this.shouldRunTest(t));

    console.log(`\n🧪 Running ${applicableTests.length} test case(s)...\n`);

    for (const testCase of applicableTests) {
      try {
        // Activate session before each test
        await this.client.getState();
        await this.executeTest(testCase);
      } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        this.results.push({
          test_id: testCase.id,
          category: testCase.category,
          title: testCase.title,
          scorer_result: {
            test_id: testCase.id,
            title: testCase.title,
            passed: false,
            score: 0,
            details: `Execution error: ${errorMsg}`,
            rules_evaluated: [],
            timestamp: new Date().toISOString(),
          },
          error: errorMsg,
        });
      }

      await this.delay(500);
    }
  }

  private async executeTest(testCase: TestCase): Promise<void> {
    if (this.verbose) {
      console.log(`[${testCase.id}] ${testCase.title}`);
      console.log(`  Category: ${testCase.category}`);
    }

    let finalResponse: Awaited<
      ReturnType<typeof this.client.sendMessage>
    > | null = null;
    if (testCase.prompt) {
      finalResponse = await this.client.sendMessage(testCase.prompt);
    } else if (testCase.prompt_sequence) {
      for (const prompt of testCase.prompt_sequence) {
        finalResponse = await this.client.sendMessage(prompt);
      }
    }

    let scorerResult: ScorerResult;

    if (
      testCase.scorer_type === "rule_based" &&
      testCase.rules &&
      finalResponse
    ) {
      scorerResult = await this.scorer.scoreRuleBased(
        testCase.id,
        testCase.title,
        testCase.rules,
        finalResponse,
      );
    } else if (
      testCase.scorer_type === "llm_as_judge" &&
      testCase.llm_criteria &&
      finalResponse
    ) {
      const context =
        testCase.prompt || testCase.prompt_sequence?.join(" → ") || "";
      scorerResult = await this.scorer.scoreLLMAsJudge(
        testCase.id,
        testCase.title,
        testCase.llm_criteria,
        context,
        finalResponse,
      );
    } else {
      scorerResult = {
        test_id: testCase.id,
        title: testCase.title,
        passed: false,
        score: 0,
        details: "Unknown scorer type",
        rules_evaluated: [],
        timestamp: new Date().toISOString(),
      };
    }

    this.results.push({
      test_id: testCase.id,
      category: testCase.category,
      title: testCase.title,
      scorer_result: scorerResult,
      raw_response: finalResponse?.message, // Include raw response for diagnostics
    });

    const status = scorerResult.passed ? "✓ PASS" : "✗ FAIL";
    console.log(`[${testCase.id}] ${status} (${scorerResult.score}/100)`);

    if (this.verbose && scorerResult.details) {
      console.log(`  Details: ${scorerResult.details.substring(0, 150)}`);
    }
  }

  async generateReport(): Promise<void> {
    const reportDir = path.join(process.cwd(), "test-results");
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const reportFile = path.join(reportDir, `report-${timestamp}.json`);

    const passed = this.results.filter((r) => r.scorer_result.passed).length;
    const total = this.results.length;
    const avgScore = Math.round(
      this.results.reduce((sum, r) => sum + r.scorer_result.score, 0) / total,
    );

    const byCategory: Record<string, number[]> = {};
    this.results.forEach((r) => {
      if (!byCategory[r.category]) byCategory[r.category] = [];
      byCategory[r.category].push(r.scorer_result.score);
    });

    const categoryStats = Object.entries(byCategory).map(([cat, scores]) => ({
      category: cat,
      tests: scores.length,
      avg_score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      pass_rate: `${Math.round((scores.filter((s) => s >= 75).length / scores.length) * 100)}%`,
    }));

    const report = {
      execution_date: new Date().toISOString(),
      summary: {
        total_tests: total,
        passed: passed,
        failed: total - passed,
        pass_rate: `${Math.round((passed / total) * 100)}%`,
        average_score: avgScore,
      },
      by_category: categoryStats,
      detailed_results: this.results,
    };

    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    console.log(`\n✓ Report written to ${reportFile}`);

    console.log(
      `\n${this.scorer.formatSummary(this.results.map((r) => r.scorer_result))}`,
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

async function main() {
  const baseUrl = process.env.BASE_URL || "https://2ndround.sandb0x.run";
  const token = process.env.CHATBOT_TOKEN || "kwpw-fees-19bg-fm6z-svqr-d29p8n";
  const sessionId = process.env.CHATBOT_SESSION_ID || "5e0ec23e76d719aa";

  const harness = new TestHarness(baseUrl, token, sessionId);

  const verbose = process.argv.includes("--verbose");
  const filterIdx = process.argv.indexOf("--filter");
  const filter = filterIdx >= 0 ? process.argv[filterIdx + 1] : undefined;

  harness.setVerbose(verbose);
  if (filter) harness.setFilter(filter);

  const testCasesPath = path.join(__dirname, "test-cases.json");
  await harness.loadTestCases(testCasesPath);

  console.log(`🚀 Starting Meridian Banking Chatbot Test Harness`);
  console.log(`   Base URL: ${baseUrl}`);
  console.log(`   Token: ${token.substring(0, 10)}...`);
  console.log(`   Session: ${sessionId.substring(0, 8)}...`);

  await harness.executeTests();
  await harness.generateReport();
}

main().catch(console.error);
