/**
 * Meridian Banking Chatbot Test Scorer
 * Implements rule-based and LLM-as-judge scoring logic
 */

import Anthropic from "@anthropic-ai/sdk";

export interface ScorerResult {
  test_id: string;
  title: string;
  passed: boolean;
  score: number;
  details: string;
  rules_evaluated: RuleResult[];
  timestamp: string;
}

export interface RuleResult {
  rule_name: string;
  passed: boolean;
  weight: number;
  message: string;
}

export interface ChatResponse {
  message: string;
  metadata?: {
    latency_ms: number;
    tokens?: number;
    model?: string;
  };
  http_status?: number;
}

export class ChatbotScorer {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic();
  }

  async scoreRuleBased(
    testId: string,
    title: string,
    rules: Record<string, unknown>[],
    response: ChatResponse,
  ): Promise<ScorerResult> {
    const ruleResults: RuleResult[] = [];
    let totalWeight = 0;
    let weightedScore = 0;

    for (const rule of rules) {
      const result = this.evaluateRule(rule, response);
      ruleResults.push(result);
      const weight = typeof rule.weight === "number" ? rule.weight : 1;
      totalWeight += weight;
      weightedScore += result.passed ? weight : 0;
    }

    const score = totalWeight > 0 ? (weightedScore / totalWeight) * 100 : 0;
    const passed = score >= 75;

    return {
      test_id: testId,
      title,
      passed,
      score: Math.round(score),
      details: ruleResults
        .map((r) => `${r.rule_name}: ${r.message}`)
        .join("\n"),
      rules_evaluated: ruleResults,
      timestamp: new Date().toISOString(),
    };
  }

  private evaluateRule(
    rule: Record<string, unknown>,
    response: ChatResponse,
  ): RuleResult {
    let passed = false;
    let message = "";

    switch (rule.type) {
      case "exact_match": {
        const expectedValues = Array.isArray(rule.expected_values)
          ? rule.expected_values
          : [];
        const matchFound = expectedValues.some((expected: unknown) =>
          response.message.includes(String(expected)),
        );
        passed = matchFound;
        message = matchFound
          ? `✓ Found expected value(s): ${expectedValues.join(", ")}`
          : `✗ Expected one of: ${expectedValues.join(", ")}`;
        break;
      }

      case "contains": {
        const expected = Array.isArray(rule.expected) ? rule.expected : [];
        const allContain = expected.every((exp: unknown) =>
          response.message.toLowerCase().includes(String(exp).toLowerCase()),
        );
        passed = allContain;
        message = allContain
          ? `✓ Contains all expected: ${expected.join(", ")}`
          : `✗ Missing: ${expected.filter((e: unknown) => !response.message.toLowerCase().includes(String(e).toLowerCase())).join(", ")}`;
        break;
      }

      case "contains_multiple": {
        const expected = Array.isArray(rule.expected) ? rule.expected : [];
        const foundCount = expected.filter((exp: unknown) =>
          response.message.includes(String(exp)),
        ).length;
        passed = foundCount >= Math.ceil(expected.length / 2);
        message = passed
          ? `✓ Found ${foundCount}/${expected.length} expected items`
          : `✗ Only found ${foundCount}/${expected.length}`;
        break;
      }

      case "not_contains": {
        const unexpected = Array.isArray(rule.unexpected)
          ? rule.unexpected
          : [];
        const anyFound = unexpected.some((unexp: unknown) =>
          response.message.includes(String(unexp)),
        );
        passed = !anyFound;
        message = !anyFound
          ? `✓ No unexpected content found`
          : `✗ Found forbidden: ${unexpected.filter((u: unknown) => response.message.includes(String(u))).join(", ")}`;
        break;
      }

      case "regex": {
        const pattern = String(rule.pattern);
        const regex = new RegExp(pattern, "i");
        passed = regex.test(response.message);
        message = passed
          ? `✓ Matches pattern: ${pattern}`
          : `✗ Does not match pattern: ${pattern}`;
        break;
      }

      case "latency": {
        const latency = response.metadata?.latency_ms || 0;
        const maxMs = typeof rule.max_ms === "number" ? rule.max_ms : 0;
        passed = latency <= maxMs;
        message = passed
          ? `✓ Response time ${latency}ms <= ${maxMs}ms`
          : `✗ Response time ${latency}ms > ${maxMs}ms`;
        break;
      }

      case "http_status": {
        passed = response.http_status === rule.expected;
        message = passed
          ? `✓ HTTP ${response.http_status} as expected`
          : `✗ HTTP ${response.http_status}, expected ${rule.expected}`;
        break;
      }

      case "all_contain": {
        const expected = Array.isArray(rule.expected) ? rule.expected : [];
        const allFound = expected.every((exp: unknown) =>
          response.message.includes(String(exp)),
        );
        passed = allFound;
        message = allFound
          ? `✓ All expected values present`
          : `✗ Missing: ${expected.filter((e: unknown) => !response.message.includes(String(e))).join(", ")}`;
        break;
      }

      default:
        message = `Unknown rule type: ${rule.type}`;
    }

    return {
      rule_name: String(rule.name),
      passed,
      weight: typeof rule.weight === "number" ? rule.weight : 1,
      message,
    };
  }

  async scoreLLMAsJudge(
    testId: string,
    title: string,
    criteria: Record<string, unknown>,
    context: string,
    response: ChatResponse,
  ): Promise<ScorerResult> {
    const prompt = `
You are an expert evaluator of AI chatbot responses in a banking context.

Test: ${title}
User Question/Context: ${context}
Chatbot Response: "${response.message}"

Evaluation Criteria: ${criteria.question}

Please evaluate on a scale of 0-5:
- 5: Excellent response, fully addresses the question with accurate information
- 4: Good response, mostly accurate with minor issues
- 3: Acceptable response, addresses core question but with some concerns
- 2: Poor response, significant issues or inaccuracies
- 1: Very poor response, does not address the question or is dangerously inaccurate
- 0: Completely failed - harmful, nonsensical, or dangerously wrong

Guidance: ${criteria.guidance}

Respond ONLY with:
SCORE: [0-5]
REASON: [Brief explanation]
`;

    try {
      const message = await this.client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const responseText =
        message.content[0].type === "text" ? message.content[0].text : "";
      const scoreMatch = responseText.match(/SCORE:\s*(\d)/);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) * 20 : 0;
      const reasonMatch = responseText.match(/REASON:\s*(.+)/);
      const reason = reasonMatch ? reasonMatch[1] : "No reasoning provided";

      return {
        test_id: testId,
        title,
        passed: score >= 60,
        score,
        details: `LLM Judge Score: ${score}/100\nReasoning: ${reason}`,
        rules_evaluated: [
          {
            rule_name: "llm_as_judge",
            passed: score >= 60,
            weight: 1.0,
            message: reason,
          },
        ],
        timestamp: new Date().toISOString(),
      };
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        test_id: testId,
        title,
        passed: false,
        score: 0,
        details: `Error running LLM judge: ${errorMsg}`,
        rules_evaluated: [],
        timestamp: new Date().toISOString(),
      };
    }
  }

  formatSummary(results: ScorerResult[]): string {
    const passed = results.filter((r) => r.passed).length;
    const total = results.length;
    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / total,
    );

    return `
CHATBOT TEST EXECUTION SUMMARY
${new Date().toISOString()}

RESULTS: ${passed}/${total} tests passed (${Math.round((passed / total) * 100)}%)
AVERAGE SCORE: ${avgScore}/100

TEST BREAKDOWN:
${results.map((r) => `  ${r.test_id}: ${r.title}\n    Status: ${r.passed ? "✓ PASS" : "✗ FAIL"} | Score: ${r.score}/100`).join("\n")}
`;
  }
}
