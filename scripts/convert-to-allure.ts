/**
 * Convert harness JSON test results to Allure format
 * This allows Allure Report to visualize our custom test format
 */

import fs from "fs";
import path from "path";

interface TestResult {
	test_id: string;
	category: string;
	title: string;
	scorer_result: {
		passed: boolean;
		score: number;
		details: string;
		timestamp: string;
	};
	raw_response?: string;
}

interface AllureResult {
	name: string;
	status: "passed" | "failed";
	statusDetails?: {
		message?: string;
		trace?: string;
	};
	stage: "finished";
	start: number;
	stop: number;
	uuid: string;
	historyId: string;
	fullName: string;
	labels: Array<{
		name: string;
		value: string;
	}>;
	steps: Array<{
		name: string;
		status: "passed" | "failed";
		stage: "finished";
		start: number;
		stop: number;
	}>;
}

function convertToAllure(testResult: TestResult): AllureResult {
	const startTime = new Date(testResult.scorer_result.timestamp).getTime();
	const endTime = startTime + 1000; // Add 1 second for duration
	const uuid = `${testResult.test_id}-${startTime}`;
	const historyId = `${testResult.test_id}`
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "-");

	const allureResult: AllureResult = {
		name: testResult.title,
		status: testResult.scorer_result.passed ? "passed" : "failed",
		statusDetails: testResult.scorer_result.passed
			? undefined
			: {
					message: `Score: ${testResult.scorer_result.score}/100\n${testResult.scorer_result.details}`,
					trace: testResult.raw_response || "No response",
				},
		stage: "finished",
		start: startTime,
		stop: endTime,
		uuid: uuid,
		historyId: historyId,
		fullName: `${testResult.category} > ${testResult.title}`,
		labels: [
			{
				name: "package",
				value: "tests.harness",
			},
			{
				name: "testClass",
				value: testResult.category,
			},
			{
				name: "testMethod",
				value: testResult.test_id,
			},
			{
				name: "score",
				value: `${testResult.scorer_result.score}/100`,
			},
		],
		steps: [
			{
				name: `Validation: ${testResult.scorer_result.details.split("\n")[0]}`,
				status: testResult.scorer_result.passed ? "passed" : "failed",
				stage: "finished",
				start: startTime,
				stop: endTime,
			},
		],
	};

	return allureResult;
}

function processResults(): void {
	const resultsDir = path.join(process.cwd(), "tests/harness/test-results");
	const allureDir = path.join(process.cwd(), "tests/harness/allure-results");

	// Create allure-results directory if it doesn't exist
	if (!fs.existsSync(allureDir)) {
		fs.mkdirSync(allureDir, { recursive: true });
	}

	// Find the latest report
	const files = fs
		.readdirSync(resultsDir)
		.filter((f) => f.startsWith("report-") && f.endsWith(".json"))
		.sort()
		.reverse();

	if (files.length === 0) {
		console.log("No test results found");
		return;
	}

	const latestReport = files[0];
	const reportPath = path.join(resultsDir, latestReport);

	console.log(`📊 Converting ${latestReport} to Allure format...`);

	// Read the report
	const reportData = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

	// Convert each test result
	const allureResults = reportData.detailed_results.map((result: TestResult) =>
		convertToAllure(result),
	);

	// Write Allure results
	allureResults.forEach((result: AllureResult) => {
		const allureFileName = `${result.uuid}-result.json`;
		const allureFilePath = path.join(allureDir, allureFileName);

		fs.writeFileSync(allureFilePath, JSON.stringify(result, null, 2));
		console.log(`✓ Converted: ${result.name}`);
	});

	console.log(
		`\n✅ ${allureResults.length} test results converted to Allure format`,
	);
	console.log(`📁 Results saved to: ${allureDir}`);
}

processResults();
