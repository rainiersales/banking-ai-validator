# Test Coverage

## Overview

Total of **87 test cases** covering:

- **14 API tests** with hybrid scoring (rule-based + LLM-as-judge)
- **73 BDD scenarios** in Gherkin syntax (57 active, 16 skipped)

## Coverage by Category

| Category       | API    | BDD    | Total  |
| -------------- | ------ | ------ | ------ |
| Account Data   | 4      | 8      | **12** |
| Transfers      | 2      | 6      | **8**  |
| Security       | 2      | 8      | **10** |
| Performance    | 1      | 2      | **3**  |
| Conversational | 2      | 8      | **10** |
| Context        | 1      | 3      | **4**  |
| Fallback       | 1      | 4      | **5**  |
| Load Testing   | 0      | 3      | **3**  |
| Compatibility  | 0      | 4      | **4**  |
| UI/UX          | 0      | 5      | **5**  |
| Usability      | 0      | 3      | **3**  |
| Regression     | 0      | 4      | **4**  |
| Moderation     | 0      | 3      | **3**  |
| Prompts        | 0      | 2      | **2**  |
| **TOTAL**      | **14** | **73** | **87** |

## Coverage Goals

- ✅ **Data Accuracy** — 40% of tests (account balances, transfers, customer data)
- ✅ **User Flows** — 25% of tests (conversation paths, transactions, navigation)
- ✅ **Security** — 20% of tests (injection attacks, credential handling, rate limiting)
- ✅ **Quality** — 10% of tests (response clarity, professionalism, error handling)
- ✅ **Robustness** — 5% of tests (edge cases, timeout handling, fallback scenarios)

## Active vs Skipped

- ✅ **57 Active BDD Scenarios** — Execute successfully in CI/CD
- ⏭️ **16 Skipped BDD Scenarios** — Pending app-level fixes (@skip tag)
  - Prompt injection (system-level attack vectors)
  - Advanced transfer validation
  - Load testing (better suited for dedicated load tools)
  - Some accessibility features (application-level missing)
