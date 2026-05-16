# Test Harness

Automated test framework for the Meridian Banking AI chatbot API. 14 API tests with hybrid rule-based + LLM-as-judge scoring.

## Quick Start

```bash
npm install
npm run harness
```

For all commands, see [COMMON_COMMANDS.md](../../docs/COMMON_COMMANDS.md).

## Setup

```bash
cp .env.example .env
```

Update in `.env`:

- `BASE_URL` — API endpoint
- `CHATBOT_TOKEN` — Session token
- `ANTHROPIC_API_KEY` — Claude API key for LLM-as-judge scoring

## Directory Structure

```
tests/harness/
├── harness.ts         # Test orchestrator
├── scorer.ts          # Scoring engine (9 rule types + LLM-as-judge)
├── chat-client.ts     # HTTP client
├── test-cases.json    # 14 test definitions
├── test-results/      # JSON reports
├── allure-results/    # Allure format reports
└── package.json       # Local dependencies
```

## Test Coverage

14 test cases across 6 categories:

- **Account Data (4):** Balance, card details, limits, transactions
- **Actionable Flows (2):** Valid/invalid transfers
- **Security (2):** SQL injection, credential exposure
- **Conversational (2):** Multi-turn context, clarifications
- **Robustness (2):** Edge cases, long input
- **Performance (1):** Latency < 3s

For details, see [APPROACH_NOTE.md](../../docs/APPROACH_NOTE.md) and [SCORING_LOGIC.md](../../docs/SCORING_LOGIC.md).

```
🚀 Starting Meridian Banking Chatbot Test Harness
   Base URL: https://2ndround.sandb0x.run
   Token: kwpw-fees-19b...

✓ Loaded 15 test cases

🧪 Running 15 test case(s)...

[ACCOUNT_001] ✓ PASS (100/100)
[ACCOUNT_002] ✓ PASS (100/100)
...

✓ Report written to test-results/report-2026-05-16T10-32-45.json
```

---

## Troubleshooting

**Missing dependencies?**

```bash
npm install
```

**API key error?**
Check `.env` has `ANTHROPIC_API_KEY` set.

**Tests fail on first run?**
Verify `BASE_URL` and `CHATBOT_TOKEN` are correct.

---

**Status:** ✅ Production Ready
