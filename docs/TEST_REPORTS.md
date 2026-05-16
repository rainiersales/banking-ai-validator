# Test Reports & Visualization

## Local Allure Reports

Generate beautiful, interactive test reports locally:

### Generation

```bash
# Generate report from latest test results
npm run report

# Open in browser
npm run report:open

# Clean old reports
npm run report:clean

# One-command: run tests + generate report
npm run ci:test
```

### Report Contents

- ✅ **Test pass/fail status** and numerical scores
- 📊 **Overall statistics** and pass rate
- 🎯 **Tests grouped by category** (Account, Security, Transfer, etc.)
- ⏱️ **Execution timeline** and duration breakdown
- 🔍 **Detailed failure information** with assertion messages
- 📈 **Historical tracking** of previous test runs

### Report Locations

```
# JSON Reports (raw data)
tests/harness/test-results/report-2026-05-16T10-32-45.json

# HTML Report (interactive)
allure-report/index.html

# Test Artifacts
cypress/screenshots/           (on UI test failure)
cypress/videos/               (on UI test failure)
```

## Report Features

### Summary Dashboard

```
Test Results: 14/14 PASSED
Pass Rate: 100%
Average Score: 98/100
Execution Time: 2m 34s
```

### Category Breakdown

| Category       | Passed | Failed | Pass Rate |
| -------------- | ------ | ------ | --------- |
| ACCOUNT        | 4      | 0      | 100%      |
| SECURITY       | 2      | 0      | 100%      |
| TRANSFER       | 2      | 0      | 100%      |
| CONVERSATIONAL | 2      | 0      | 100%      |
| VARIANCE       | 2      | 0      | 100%      |
| PERFORMANCE    | 1      | 0      | 100%      |
| EDGE           | 1      | 0      | 100%      |

### Detailed Results

Each test result includes:

```json
{
  "test_id": "ACCOUNT_001",
  "title": "Get Account Balance",
  "category": "ACCOUNT",
  "passed": true,
  "score": 100,
  "details": "4/4 rules passed",
  "execution_time_ms": 2456,
  "rules_evaluated": [
    {
      "type": "exact_match",
      "passed": true,
      "expected": "$1,234.56",
      "actual": "$1,234.56"
    }
  ]
}
```

## CI/CD Integration

### Automated Reporting

Reports automatically generate in CI/CD pipelines:

```bash
# In GitHub Actions or local CI
npm run ci:test
```

### GitHub Pages Deployment

Reports deploy to GitHub Pages on every push:

```
https://rainiersales.github.io/banking-ai-validator/reports/
```

**Features:**

- ✅ Automatic deployment via GitHub Actions
- ✅ Historical reports (one per test run)
- ✅ Team-accessible via public URL
- ✅ 30-90 day artifact retention

See [ALLURE_SETUP.md](./ALLURE_SETUP.md) for complete setup guide.

## Interpreting Results

### Pass Rate

- **90%+** — Excellent, production-ready
- **75-90%** — Good, minor issues to fix
- **Below 75%** — Review and fix failing tests

### Average Score

- **90+** — Excellent quality
- **75-90** — Good quality
- **Below 75** — Investigate failures

### Execution Time

- **API Tests** — ~2 minutes for 14 tests
- **UI Tests** — ~5-10 minutes for 73 scenarios
- **Total** — ~15 minutes for full suite

### Failure Analysis

```json
{
  "test_id": "TRANSFER_001",
  "passed": false,
  "score": 50,
  "details": "2/4 rules failed",
  "rules_evaluated": [
    {
      "type": "exact_match",
      "passed": false,
      "expected": "Transfer initiated",
      "actual": "Transfer pending approval",
      "weight": 2.0
    }
  ],
  "recommendation": "Update test case expectation or fix API response"
}
```

## Viewing Trends

Historical reports allow you to track:

- ✅ Pass rate trends over time
- 📈 Average score progression
- 🎯 Category-specific improvements
- ⏱️ Performance degradation patterns

### Trend Analysis

```
Date       | Pass Rate | Avg Score | Issues
-----------|-----------|-----------|--------
2026-05-16 | 100%      | 98/100    | None
2026-05-15 | 93%       | 92/100    | 1 flaky test
2026-05-14 | 93%       | 88/100    | API latency
```

## Best Practices

1. **Review reports after every test run**
2. **Track trends over time** to identify patterns
3. **Investigate failures immediately** (don't ignore)
4. **Adjust thresholds** based on production needs
5. **Archive old reports** for compliance
