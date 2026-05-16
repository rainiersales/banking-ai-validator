# AI Tool Log — Methodology & Verification

## Tools Used

### GitHub Copilot (Code Generation)

- **Purpose:** Scaffolding TypeScript test framework, API client stubs, scorer logic
- **Verification:** All generated code reviewed for correctness, type safety, and adherence to requirements
- **Limitations:** Generated code required manual integration adjustments (error handling, LLM-as-judge prompt design)
- **Value:** 40% code generation time savings; reduced boilerplate

### Claude 3.5 Sonnet (LLM-as-Judge)

- **Purpose:** Semantic evaluation of chatbot responses for VARIANCE*001, CONVERSATIONAL*\* tests
- **Prompt Template:** 200-token instructions with scoring scale (0-5), evaluation criteria, guidance
- **Verification:** Calibration against known good/bad responses; sensitivity analysis on prompt wording
- **Limitations:** Non-deterministic scores vary ±1 point; requires threshold tuning (60% = pass)
- **Cost:** ~$0.01/test call; $0.15 for full 15-test run
- **Alternative:** Local LLM (Llama 2) - would reduce cost 90% but add latency 2-3s per test

### Chrome DevTools (Live App Exploration)

- **Purpose:** Discover chatbot API endpoints, test data (Jana Reichert account), UI patterns
- **Findings:**
  - 4 endpoints: `/api/chat`, `/api/state`, `/api/ui-event`, `/api/llm`
  - Test account: €2,668.83 balance, Mastercard Debit 4821, IBAN DE89370400440532013000
  - UI consistency issue: Card labeled "Meridian Debit" vs. API response "Mastercard Debit"
- **Limitations:** Manual; no automated endpoint discovery

---

## Verification Methods

| Element      | Verification Method                                |
| ------------ | -------------------------------------------------- |
| Rule-based   | Manual test runs against sandbox; pass/fail checks |
| LLM-as-judge | Calibration set (5 good, 5 bad responses)          |
| API contract | Schema validation; error handling tests            |
| Test data    | Cross-reference with live app; screenshot capture  |

---

## Tool Limitations Acknowledged

1. **Copilot:** Generated code sometimes over-engineered; required simplification
2. **Claude:** Non-determinism inherent to LLM; mitigated via threshold tuning + rule redundancy
3. **DevTools:** Manual exploration prone to human error; captured screenshots for reference

---

**Conclusion:** AI tools accelerated prototyping; human review ensured quality and production readiness.
