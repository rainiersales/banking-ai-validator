# Test Harness — Meridian Banking Chatbot

Automated test framework for the Meridian Banking AI chatbot API. Implements 15 test cases across 6 categories with hybrid rule-based and LLM-as-judge scoring.

---

## Quick Start

```bash
# Install harness-specific dependencies
npm install

# Run all 15 test cases
npm run harness

# Run with verbose output
npm run harness:verbose

# Run by category
npm run harness:account
npm run harness:security
npm run harness:transfer
```

---

## Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update values:

- `BASE_URL` — API endpoint (default: sandbox)
- `CHATBOT_TOKEN` — Session token
- `ANTHROPIC_API_KEY` — Claude API key for LLM-as-judge

---

## Test Cases (15 total)

| ID                 | Category        | Type       | Purpose                |
| ------------------ | --------------- | ---------- | ---------------------- |
| ACCOUNT_001        | Account Data    | Rule-based | Balance query          |
| ACCOUNT_002        | Account Data    | Rule-based | Card details           |
| ACCOUNT_003        | Account Data    | Rule-based | Card limits            |
| ACCURACY_001       | Account Data    | Rule-based | Transaction history    |
| VARIANCE_001       | Account Data    | LLM-Judge  | Semantic equivalence   |
| TRANSFER_001       | Actionable Flow | Rule-based | Valid transfer         |
| TRANSFER_002       | Actionable Flow | Rule-based | Invalid IBAN rejection |
| SECURITY_001       | Security        | Rule-based | SQL injection          |
| SECURITY_002       | Security        | Rule-based | PIN/password request   |
| CONVERSATIONAL_001 | Conversational  | LLM-Judge  | Multi-turn context     |
| CONVERSATIONAL_002 | Conversational  | LLM-Judge  | Clarification requests |
| EDGE_CASE_001      | Robustness      | Rule-based | Empty/whitespace input |
| EDGE_CASE_002      | Robustness      | Rule-based | Very long input        |
| PERFORMANCE_001    | Performance     | Rule-based | Response latency < 3s  |

---

## Scoring Logic

### Rule-Based (13 tests)

9 rule types evaluated:

- `exact_match` — Exact value present
- `contains` — All keywords present
- `contains_multiple` — Majority of keywords
- `not_contains` — Forbidden words absent
- `regex` — Pattern match
- `latency` — Response time threshold
- `http_status` — HTTP status code
- `all_contain` — All values present

**Pass Threshold:** ≥75% of weighted rules

### LLM-as-Judge (2 tests)

Claude 3.5 Sonnet evaluates on 0-5 scale.

**Pass Threshold:** ≥3/5 (60/100)

---

## Files

- `harness.ts` — Main orchestrator
- `scorer.ts` — Scoring engine
- `chat-client.ts` — API client
- `test-cases.json` — Test definitions
- `package.json` — Dependencies (local)
- `tsconfig.json` — TypeScript config (local)

---

## Output

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
