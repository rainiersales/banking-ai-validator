# Test Scenarios Inventory

**Complete test-case set** with labelled prompts, expectations, pass/fail criteria, and rationale for all tests. This file is **automatically updated** every time test cases change — no manual maintenance needed.

### What's in This Inventory

- **14 API Test Cases** ([tests/harness/test-cases.json](./tests/harness/test-cases.json)) — Standardised evals with rule-based + LLM-as-judge scoring
- **73 BDD Scenarios** ([cypress/e2e/](./cypress/e2e/)) — User journey tests in Gherkin syntax with step definitions
- **Rationale** — Why each test was chosen (data accuracy, security, conversational quality, robustness)
- **Status Tracking** — ✅ Active vs ⏭️ Skipped scenarios with clear indicators

> **Auto-generated** — Updated automatically via `npm run docs:scenarios`
> Last generated: 2026-05-16T16:44:48.327Z

## 🔧 API Tests

**Total:** 14 test cases

| ID                     | Category               | Title                                             |
| ---------------------- | ---------------------- | ------------------------------------------------- |
| **ACCOUNT_001**        | Account Data Accuracy  | Query current balance                             |
| **ACCOUNT_002**        | Account Data Accuracy  | Query card details                                |
| **ACCOUNT_003**        | Account Data Accuracy  | Query card limits                                 |
| **ACCURACY_001**       | Account Data Accuracy  | Query recent transactions                         |
| **TRANSFER_001**       | Actionable Flows       | Execute money transfer with valid IBAN            |
| **TRANSFER_002**       | Actionable Flows       | Reject transfer with invalid IBAN                 |
| **CONVERSATIONAL_001** | Conversational Quality | Multi-turn context: follow-up after balance query |
| **CONVERSATIONAL_002** | Conversational Quality | Clarification request for missing required field  |
| **VARIANCE_001**       | Determinism Variance   | Semantic equivalence: rephrase same query         |
| **EDGE_CASE_001**      | Edge Cases Robustness  | Handle empty/whitespace input                     |
| **EDGE_CASE_002**      | Edge Cases Robustness  | Handle very long input                            |
| **PERFORMANCE_001**    | Performance            | Chat response latency < 3 seconds                 |
| **SECURITY_001**       | Security Guardrails    | Reject SQL injection attempt                      |
| **SECURITY_002**       | Security Guardrails    | Reject request for password/PIN                   |

## 🧪 Cypress BDD Tests

**Total:** 73 scenarios (57 active, 16 skipped)

| Status     | Scenario                                                       | Feature          | Type    | Tags                                            |
| ---------- | -------------------------------------------------------------- | ---------------- | ------- | ----------------------------------------------- |
| ✅ Active  | Chat interface renders on desktop viewport                     | devices          | Regular | `compatibility` `ui` `slow` `regression`        |
| ✅ Active  | Chat interface renders on mobile viewport                      | devices          | Regular | `compatibility` `ui` `slow` `regression`        |
| ✅ Active  | Chat interface renders on tablet viewport                      | devices          | Regular | `compatibility` `ui` `slow` `regression`        |
| ✅ Active  | Chat messages wrap correctly on narrow viewport                | devices          | Regular | `compatibility` `ui` `slow` `regression`        |
| ✅ Active  | Chatbot is usable on touch screen (mobile interaction)         | devices          | Regular | `compatibility` `ui` `slow` `regression`        |
| ✅ Active  | Chatbot clarifies ambiguous follow-up                          | memory           | Regular | `conversational` `regression` `smoke`           |
| ✅ Active  | Chatbot handles topic switch gracefully                        | memory           | Regular | `conversational` `regression` `smoke`           |
| ✅ Active  | Chatbot retains balance context for follow-up                  | memory           | Regular | `conversational` `regression` `smoke`           |
| ✅ Active  | Chatbot retains transfer intent across turns                   | memory           | Regular | `conversational` `regression` `smoke`           |
| ⏭️ Skipped | Complete transfer flow with valid IBAN                         | transfer_flow    | Regular | `conversational` `functional` `ddt` `skip`      |
| ✅ Active  | Transfer flow — chatbot asks for amount when missing           | transfer_flow    | Regular | `conversational` `functional` `ddt`             |
| ✅ Active  | Transfer flow — chatbot asks for IBAN when missing             | transfer_flow    | Regular | `conversational` `functional` `ddt`             |
| ⏭️ Skipped | User cancels transfer mid-flow                                 | transfer_flow    | Regular | `conversational` `functional` `ddt` `skip`      |
| ✅ Active  | Complete account overview journey                              | user_journey     | Regular | `e2e` `smoke` `critical` `regression`           |
| ⏭️ Skipped | Complete transfer journey with confirmation                    | user_journey     | Regular | `e2e` `smoke` `critical` `regression` `skip`    |
| ✅ Active  | Customer encounters a problem and gets help                    | user_journey     | Regular | `e2e` `smoke` `critical` `regression`           |
| ✅ Active  | Customer queries balance then makes a transfer                 | user_journey     | Regular | `e2e` `smoke` `critical` `regression`           |
| ✅ Active  | Ambiguous request triggers clarification                       | error_handling   | Regular | `fallback` `robustness` `regression`            |
| ✅ Active  | Emoji input is handled                                         | error_handling   | Regular | `fallback` `robustness` `regression`            |
| ⏭️ Skipped | Empty input is handled gracefully                              | error_handling   | Regular | `fallback` `robustness` `regression` `skip`     |
| ⏭️ Skipped | Off-topic question is gracefully redirected                    | error_handling   | Regular | `fallback` `robustness` `regression` `skip`     |
| ✅ Active  | Special characters are handled safely                          | error_handling   | Regular | `fallback` `robustness` `regression`            |
| ✅ Active  | Very long input does not crash the bot                         | error_handling   | Regular | `fallback` `robustness` `regression`            |
| ✅ Active  | Multiple phrasings of balance query return consistent results  | account          | Outline | `functional` `smoke` `regression` `ddt`         |
| ✅ Active  | Retrieve account balance                                       | account          | Regular | `functional` `smoke` `regression` `ddt`         |
| ⏭️ Skipped | Retrieve card details                                          | account          | Regular | `functional` `smoke` `regression` `ddt` `skip`  |
| ⏭️ Skipped | Retrieve card limit                                            | account          | Regular | `functional` `smoke` `regression` `ddt` `skip`  |
| ✅ Active  | Retrieve transaction history                                   | account          | Regular | `functional` `smoke` `regression` `ddt`         |
| ✅ Active  | Note — Full concurrent user load testing                       | concurrency      | Regular | `load` `slow` `performance` `note`              |
| ⏭️ Skipped | Response time stays within SLA under simulated load            | concurrency      | Regular | `load` `slow` `performance` `skip`              |
| ⏭️ Skipped | Session recovers after a failed request                        | concurrency      | Regular | `load` `slow` `performance` `skip`              |
| ✅ Active  | Single session handles rapid successive messages               | concurrency      | Regular | `load` `slow` `performance`                     |
| ✅ Active  | Card theft report is handled urgently                          | toxicity         | Regular | `moderation` `security` `regression`            |
| ✅ Active  | Off-topic joke request is declined politely                    | toxicity         | Regular | `moderation` `security` `regression`            |
| ✅ Active  | Offensive language is de-escalated                             | toxicity         | Regular | `moderation` `security` `regression`            |
| ✅ Active  | Sensitive financial distress is handled empathetically         | toxicity         | Regular | `moderation` `security` `regression`            |
| ✅ Active  | Toxic input is acknowledged professionally                     | toxicity         | Regular | `moderation` `security` `regression`            |
| ✅ Active  | Chatbot handles back-to-back messages without degradation      | response_time    | Regular | `performance` `slow` `regression` `sla`         |
| ✅ Active  | Complex query responds within 5 seconds                        | response_time    | Regular | `performance` `slow` `regression` `sla`         |
| ✅ Active  | First message after login responds within SLA                  | response_time    | Regular | `performance` `slow` `regression` `sla`         |
| ✅ Active  | Simple query responds within 3 seconds                         | response_time    | Regular | `performance` `slow` `regression` `sla`         |
| ✅ Active  | Chatbot acknowledges uncertainty rather than inventing answers | llm_behaviour    | Regular | `quality` `regression` `smoke`                  |
| ✅ Active  | Chatbot does not hallucinate unknown account data              | llm_behaviour    | Regular | `quality` `regression` `smoke`                  |
| ✅ Active  | Chatbot maintains persona when challenged                      | llm_behaviour    | Regular | `quality` `regression` `smoke`                  |
| ✅ Active  | Chatbot refuses to pretend it has no restrictions              | llm_behaviour    | Regular | `quality` `regression` `smoke`                  |
| ✅ Active  | Same question rephrased returns semantically consistent answer | llm_behaviour    | Regular | `quality` `regression` `smoke`                  |
| ✅ Active  | Balance query always returns a response                        | core_responses   | Regular | `regression` `smoke` `critical`                 |
| ⏭️ Skipped | Empty input is handled gracefully                              | core_responses   | Regular | `regression` `smoke` `critical` `skip`          |
| ✅ Active  | Off-topic queries are gracefully redirected                    | core_responses   | Regular | `regression` `smoke` `critical`                 |
| ✅ Active  | Security queries always trigger refusal                        | core_responses   | Regular | `regression` `smoke` `critical`                 |
| ✅ Active  | Transfer intent always triggers clarification or confirmation  | core_responses   | Regular | `regression` `smoke` `critical`                 |
| ✅ Active  | Very long input is handled gracefully                          | core_responses   | Regular | `regression` `smoke` `critical`                 |
| ✅ Active  | Balance phrasings all return the balance                       | data_driven      | Outline | `regression` `ddt` `smoke`                      |
| ✅ Active  | Security probes are all rejected                               | data_driven      | Outline | `regression` `ddt` `smoke`                      |
| ✅ Active  | Transfer with invalid IBANs is always rejected                 | data_driven      | Outline | `regression` `ddt` `smoke`                      |
| ✅ Active  | Handle XSS attempt safely                                      | prompt_injection | Regular | `security` `critical` `regression` `ddt`        |
| ✅ Active  | Refuse to reveal password                                      | prompt_injection | Regular | `security` `critical` `regression` `ddt`        |
| ✅ Active  | Refuse to reveal PIN                                           | prompt_injection | Regular | `security` `critical` `regression` `ddt`        |
| ⏭️ Skipped | Reject prompt injection — override instructions                | prompt_injection | Regular | `security` `critical` `regression` `ddt` `skip` |
| ⏭️ Skipped | Reject prompt injection — system role hijack                   | prompt_injection | Regular | `security` `critical` `regression` `ddt` `skip` |
| ⏭️ Skipped | Reject SQL injection attempt                                   | prompt_injection | Regular | `security` `critical` `regression` `ddt` `skip` |
| ⏭️ Skipped | Resist DAN jailbreak attempt                                   | prompt_injection | Regular | `security` `critical` `regression` `ddt` `skip` |
| ✅ Active  | Bot typing indicator appears while waiting                     | chat_interface   | Regular | `ui` `smoke` `regression`                       |
| ✅ Active  | Chat input clears after sending a message                      | chat_interface   | Regular | `ui` `smoke` `regression`                       |
| ✅ Active  | Chat is accessible via keyboard navigation                     | chat_interface   | Regular | `ui` `smoke` `regression`                       |
| ✅ Active  | Chat scrolls to latest message automatically                   | chat_interface   | Regular | `ui` `smoke` `regression`                       |
| ✅ Active  | Message is displayed in the chat log after sending             | chat_interface   | Regular | `ui` `smoke` `regression`                       |
| ✅ Active  | Bot messages have accessible role                              | accessibility    | Regular | `accessibility` `wcag` `regression`             |
| ⏭️ Skipped | Chat input has accessible label                                | accessibility    | Regular | `accessibility` `wcag` `regression` `skip`      |
| ⏭️ Skipped | Chat interface has sufficient colour contrast                  | accessibility    | Regular | `accessibility` `wcag` `regression` `skip`      |
| ✅ Active  | Error states are communicated accessibly                       | accessibility    | Regular | `accessibility` `wcag` `regression`             |
| ✅ Active  | Page title is descriptive                                      | accessibility    | Regular | `accessibility` `wcag` `regression`             |
| ✅ Active  | Send button is keyboard accessible                             | accessibility    | Regular | `accessibility` `wcag` `regression`             |

---

## Legend

- ✅ **Active** — Running normally
- ⏭️ **Skipped** — Flagged with @skip (pending app fixes or review)
- **Outline** — Scenario Outline (parameterized with Examples)
- **Regular** — Standard Scenario

### Common Tags

- `@smoke` — Quick regression checks
- `@critical` — Critical path scenarios
- `@functional` — Feature functionality
- `@security` — Security & guardrails
- `@performance` — Performance validation
- `@skip` — Pending fixes (see comments in .feature file)
- `@regression` — Regression suite
- `@ddt` — Data-driven tests
