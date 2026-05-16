#!/usr/bin/env node

/**
 * generate-scenarios.ts — Auto-generates comprehensive scenarios inventory
 * Reads feature files and test-cases.json, outputs SCENARIOS.md
 *
 * Run manually: npm run docs:scenarios
 * Or automatically via git hook before commit
 */

import fs from "node:fs";
import path from "node:path";

interface Scenario {
	name: string;
	tags: string[];
	file: string;
	isSkipped: boolean;
	isOutline: boolean;
}

interface TestCase {
	id: string;
	category: string;
	title: string;
}

interface FeatureFile {
	file: string;
	tags: string[];
	scenarios: Scenario[];
}

// ─── Parse feature files ──────────────────────────────────────────────────────

function extractTags(line: string): string[] {
	const match = line.match(/@[\w-]+/g);
	return match ? match.map((t) => t.substring(1)) : [];
}

function parseFeatureFile(filePath: string): FeatureFile {
	const content = fs.readFileSync(filePath, "utf-8");
	const lines = content.split("\n");

	let fileTags: string[] = [];
	const scenarios: Scenario[] = [];
	let currentTags: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		// Extract file-level tags (before Feature:)
		if (line.startsWith("@") && !fileTags.length && i < 5) {
			fileTags = [...fileTags, ...extractTags(line)];
		}

		// Extract scenario-level tags
		if (line.startsWith("@")) {
			currentTags = extractTags(line);
		}

		// Parse Scenario
		if (line.startsWith("Scenario:")) {
			const name = line.replace("Scenario:", "").trim();
			const isSkipped = currentTags.includes("skip");
			const allTags = [...new Set([...fileTags, ...currentTags])];

			scenarios.push({
				name,
				tags: allTags,
				file: path.basename(filePath),
				isSkipped,
				isOutline: false,
			});

			currentTags = [];
		}

		// Parse Scenario Outline
		if (line.startsWith("Scenario Outline:")) {
			const name = line.replace("Scenario Outline:", "").trim();
			const isSkipped = currentTags.includes("skip");
			const allTags = [...new Set([...fileTags, ...currentTags])];

			scenarios.push({
				name,
				tags: allTags,
				file: path.basename(filePath),
				isSkipped,
				isOutline: true,
			});

			currentTags = [];
		}
	}

	return { file: filePath, tags: fileTags, scenarios };
}

function getCategory(filePath: string): string {
	const parts = filePath.split(path.sep);
	const index = parts.indexOf("e2e");
	return index >= 0 && index + 1 < parts.length ? parts[index + 1] : "other";
}

// ─── Load API test cases ──────────────────────────────────────────────────────

function loadApiTestCases(): TestCase[] {
	const testCasesPath = path.join(
		process.cwd(),
		"tests",
		"harness",
		"test-cases.json",
	);
	if (!fs.existsSync(testCasesPath)) {
		return [];
	}

	const content = fs.readFileSync(testCasesPath, "utf-8");
	const data = JSON.parse(content);
	return data.test_cases || [];
}

// ─── Group scenarios by category ──────────────────────────────────────────────

function groupByCategory(features: FeatureFile[]): Map<string, Scenario[]> {
	const groups = new Map<string, Scenario[]>();

	features.forEach((feature) => {
		const category = getCategory(feature.file);
		if (!groups.has(category)) {
			groups.set(category, []);
		}
		groups.get(category)!.push(...feature.scenarios);
	});

	return groups;
}

// ─── Generate markdown ────────────────────────────────────────────────────────

function generateMarkdown(
	features: FeatureFile[],
	apiTests: TestCase[],
): string {
	const lines: string[] = [];

	lines.push("# Test Scenarios Inventory");
	lines.push("");
	lines.push(
		"> **Auto-generated** — Updated automatically via `npm run docs:scenarios`",
	);
	lines.push("> Last generated: " + new Date().toISOString());
	lines.push("");

	// API Tests
	lines.push("## 🔧 API Tests");
	lines.push("");
	lines.push(`**Total:** ${apiTests.length} test cases`);
	lines.push("");

	const apiByCategory = new Map<string, TestCase[]>();
	apiTests.forEach((test) => {
		if (!apiByCategory.has(test.category)) {
			apiByCategory.set(test.category, []);
		}
		apiByCategory.get(test.category)!.push(test);
	});

	for (const [category, tests] of Array.from(apiByCategory.entries()).sort()) {
		const catName = category
			.split("_")
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
			.join(" ");

		lines.push(`### ${catName}`);
		lines.push("");

		tests.forEach((test) => {
			lines.push(`- **${test.id}** — ${test.title}`);
		});

		lines.push("");
	}

	// Cypress BDD Tests
	lines.push("## 🧪 Cypress BDD Tests");
	lines.push("");

	const byCategory = groupByCategory(features);
	const totalActive = Array.from(byCategory.values())
		.flat()
		.filter((s) => !s.isSkipped).length;
	const totalSkipped = Array.from(byCategory.values())
		.flat()
		.filter((s) => s.isSkipped).length;

	lines.push(
		`**Total:** ${totalActive + totalSkipped} scenarios (${totalActive} active, ${totalSkipped} skipped)`,
	);
	lines.push("");

	// Sort categories
	for (const [category, scenarios] of Array.from(byCategory.entries()).sort()) {
		const catName = category.charAt(0).toUpperCase() + category.slice(1);
		const active = scenarios.filter((s) => !s.isSkipped).length;
		const skipped = scenarios.filter((s) => s.isSkipped).length;

		lines.push(`### ${catName}`);
		lines.push("");
		lines.push(`${active} active, ${skipped} skipped`);
		lines.push("");

		// Sort scenarios by file and name
		const sorted = [...scenarios].sort((a, b) => {
			if (a.file !== b.file) return a.file.localeCompare(b.file);
			return a.name.localeCompare(b.name);
		});

		for (const scenario of sorted) {
			const status = scenario.isSkipped ? "⏭️" : "✅";
			const outline = scenario.isOutline ? " **(Outline)**" : "";
			const tags = scenario.tags.length
				? ` \`${scenario.tags.join(", ")}\``
				: "";

			lines.push(
				`- ${status} [${scenario.file}] ${scenario.name}${outline}${tags}`,
			);
		}

		lines.push("");
	}

	// Legend
	lines.push("---");
	lines.push("");
	lines.push("## Legend");
	lines.push("");
	lines.push("- ✅ **Active** — Running normally");
	lines.push(
		"- ⏭️ **Skipped** — Flagged with @skip (pending app fixes or review)",
	);
	lines.push(
		"- **(Outline)** — Scenario Outline (parameterized with Examples)",
	);
	lines.push("");
	lines.push("### Common Tags");
	lines.push("");
	lines.push("- `@smoke` — Quick regression checks");
	lines.push("- `@critical` — Critical path scenarios");
	lines.push("- `@functional` — Feature functionality");
	lines.push("- `@security` — Security & guardrails");
	lines.push("- `@performance` — Performance validation");
	lines.push("- `@skip` — Pending fixes (see comments in .feature file)");
	lines.push("- `@regression` — Regression suite");
	lines.push("- `@ddt` — Data-driven tests");
	lines.push("");

	return lines.join("\n");
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
	try {
		// Find all feature files
		const e2eDir = path.join(process.cwd(), "cypress", "e2e");
		const featureFiles: string[] = [];

		function findFeatureFiles(dir: string) {
			const files = fs.readdirSync(dir);
			files.forEach((file) => {
				const filePath = path.join(dir, file);
				const stat = fs.statSync(filePath);

				if (stat.isDirectory()) {
					findFeatureFiles(filePath);
				} else if (file.endsWith(".feature")) {
					featureFiles.push(filePath);
				}
			});
		}

		findFeatureFiles(e2eDir);

		// Parse feature files
		const features = featureFiles.map(parseFeatureFile);

		// Load API test cases
		const apiTests = loadApiTestCases();

		// Generate markdown
		const markdown = generateMarkdown(features, apiTests);

		// Write output
		const outputPath = path.join(process.cwd(), "SCENARIOS.md");
		fs.writeFileSync(outputPath, markdown, "utf-8");

		// Statistics
		const totalBdd = features.reduce((sum, f) => sum + f.scenarios.length, 0);
		const totalApi = apiTests.length;
		const activeScenarios = features.reduce(
			(arr, f) => [...arr, ...f.scenarios.filter((s) => !s.isSkipped)],
			[] as Scenario[],
		).length;
		const skippedScenarios = features.reduce(
			(arr, f) => [...arr, ...f.scenarios.filter((s) => s.isSkipped)],
			[] as Scenario[],
		).length;

		console.log("✅ Generated SCENARIOS.md");
		console.log(`   📊 API Tests: ${totalApi}`);
		console.log(
			`   📊 BDD Scenarios: ${totalBdd} (${activeScenarios} active, ${skippedScenarios} skipped)`,
		);
		console.log(`   📊 Total: ${totalApi + totalBdd} test cases`);
	} catch (error) {
		console.error("❌ Failed to generate scenarios:");
		console.error(error);
		process.exit(1);
	}
}

main();
