# Testing Approach — Meridian Banking Chatbot

## Philosophy

Test automation for non-deterministic AI systems requires conscious trade-offs. We validate **facts** (account balance, card details) with rule-based scoring and **quality** (conversational clarity, security) with LLM-as-judge evaluation. We do not test phrasing variations—only semantic correctness.

## Coverage Allocation (15 Tests)

**40% Data Accuracy** — 6 tests (ACCOUNT\_\*, ACCURACY_001, VARIANCE_001)

- Validates factual queries: balance, card details, limits, transactions
- Rule-based scoring: exact values must match known test account (Jana Reichert, €2,668.83, Mastercard Debit 4821)
- Variance test: semantic equivalence (e.g., "my balance" = "account balance")

**25% Actionable Flows** — 2 tests (TRANSFER\_\*)

- Tests multi-turn sequences for transfers and explicit rejection flows
- Validates state tracking across conversation turns
- Ensures invalid IBANs are rejected consistently

**20% Security Guardrails** — 2 tests (SECURITY\_\*)

- SQL injection attempt ('; DROP --) must be rejected
- PIN/password requests must be refused (banking compliance)

**10% Conversational Quality** — 2 tests (CONVERSATIONAL\_\*)

- Multi-turn context maintenance (remembering previous queries)
- Clarification requests when intent is ambiguous

**5% Robustness** — 2 tests (EDGE*CASE*\*, PERFORMANCE_001)

- Empty/whitespace input handling
- Very long input (1000+ chars) stability
- Response latency < 3 seconds

## Scoring Approach

### Rule-Based (13 Tests)

9 rule types (exact_match, contains, regex, latency, http_status, etc.) with weighted evaluation. Pass threshold: ≥75%.

**Rationale:** Deterministic evaluation for factual accuracy; fast execution; clear failure diagnostics.

### LLM-as-Judge (2 Tests)

Claude 3.5 Sonnet evaluates VARIANCE*001 and CONVERSATIONAL*\* on 0-5 scale. Pass threshold: ≥60%.

**Rationale:** Semantic matching required for LLM variance; human-like judgment for quality metrics; independent verification of rule-based approach.

## Consciously Descoped

1. **Multi-language support** — English only; internationalization adds complexity without interview value
2. **Concurrent users** — Single-session tests only; load testing deferred to Phase 2
3. **Real-time data** — Synthetic account data (Jana Reichert); assumes production uses test fixtures
4. **UI automation** — Direct API testing only; chatbot web UI out of scope
5. **Full penetration test** — 2 security tests validate basics; comprehensive pentest deferred
6. **Regression suite** — 15 tests cover breadth, not depth; Phase 2 adds parametrized variants

## Test Execution Timeline

**Estimated:** ~2 minutes (15 tests × ~6-8s per test + LLM scoring)

**Parallelization Opportunity:** Tests are independent; Phase 2 could parallelize via worker pool.

## Known Limitations

- **LLM non-determinism:** Different Claude responses each run; we test consistency in facts, not phrasing
- **Fixed test data:** Account balances hardcoded; assumes production sandbox doesn't change
- **Timeouts:** 10-second request timeout; may fail on slow networks
- **API contract:** No validation of response schema; assumes API stability

---

**Submission Context:** 8-hour design-to-execution interview exercise. Approach prioritizes demonstrating testing philosophy, tool choices, and production-readiness within time constraints.

---

## 📊 Test Reporting & Visibility

### Allure Report Integration

Test results are automatically converted to **Allure format** and visualized as interactive HTML reports:

```bash
npm run report        # Generate Allure report
npm run report:open   # View in browser
```

**Features:**

- ✅ Beautiful test status dashboard
- ✅ Pass/fail breakdown by category
- ✅ Test execution timeline
- ✅ Detailed failure analysis
- ✅ Historical trend tracking

### GitHub Actions CI/CD

Automated reporting pipeline:

- Triggers on push to `main` / `develop`
- Runs all tests automatically
- Generates Allure reports
- Deploys to GitHub Pages
- Comments on PRs with report links

**Report URL:**

```
https://rainiersales.github.io/banking-ai-validator/reports/<run-number>/
```

### JSON Reports

Raw test results (for programmatic access):

```
tests/harness/test-results/report-*.json
```

Contains:

- Test name, category, ID
- Pass/fail status and score
- Detailed evaluation criteria
- Execution timestamp

See [ALLURE_SETUP.md](./ALLURE_SETUP.md) for complete reporting documentation.
