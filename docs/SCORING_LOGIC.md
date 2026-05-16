# Scoring Logic

## API Tests: Rule-Based + LLM-as-Judge

### 9 Rule Types

1. **exact_match** — Exact string match in response
2. **contains** — Substring match (case-insensitive)
3. **regex** — Regular expression pattern
4. **contains_multiple** — All substrings present in response
5. **all_contain** — All items match substring
6. **not_contains** — Substring NOT in response
7. **http_status** — HTTP status code validation
8. **latency** — Response time in milliseconds
9. **latency_p99** — 99th percentile response time

### Weighted Evaluation

- Each rule has a configurable **weight** (default: 1.0)
- **Pass threshold:** ≥75% of total weighted rule points
- **Score:** (weighted_points_passed / total_weighted_points) × 100

### Example Scoring Configuration

```json
{
  "rules": [
    {
      "type": "exact_match",
      "field": "account_balance",
      "value": "$1,234.56",
      "weight": 2.0
    },
    {
      "type": "contains",
      "field": "message",
      "value": "successful",
      "weight": 1.0
    },
    {
      "type": "http_status",
      "value": 200,
      "weight": 1.5
    },
    {
      "type": "latency",
      "value": 2000,
      "weight": 0.5
    }
  ]
}
```

### LLM-as-Judge Integration

**When Used:** Mixed and LLM-as-judge test cases

**Tool:** Claude 3.5 Sonnet (Anthropic)

**Evaluation Criteria:**

- Clarity of response
- Professionalism and tone
- Completeness of answer
- Conversational appropriateness

**Scoring:** 0-5 semantic evaluation score

**Pass Threshold:** ≥60% of LLM score (≥3/5)

## UI Tests: User Action Validation

- **Custom Cypress commands** for readable tests
- **Real browser interaction** — clicks, typing, waits
- **Assertions on:**
  - UI element visibility and state
  - Response content and format
  - Response times (performance)
  - Error message accuracy

## Test Result Interpretation

```json
{
  "test_id": "ACCOUNT_001",
  "title": "Get Account Balance",
  "passed": true,
  "score": 95,
  "details": "4/4 rules passed. Response latency excellent.",
  "rules_evaluated": [
    {
      "type": "exact_match",
      "passed": true,
      "weight": 2.0,
      "message": "Account balance matches"
    }
  ]
}
```

## Key Metrics

- **Rule Accuracy** — 99%+ (deterministic)
- **LLM Variance** — ±10% (semantic evaluation)
- **Overall Pass Rate** — 90%+ (production-grade)
- **Execution Speed** — 2-3 seconds per API test
