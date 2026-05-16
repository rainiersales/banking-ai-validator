# Test Scenarios Inventory

> **Auto-generated** — Updated automatically via `npm run docs:scenarios`
> Last generated: 2026-05-16T16:42:27.857Z

## 🔧 API Tests

**Total:** 14 test cases

### Account Data Accuracy

- **ACCOUNT_001** — Query current balance
- **ACCOUNT_002** — Query card details
- **ACCOUNT_003** — Query card limits
- **ACCURACY_001** — Query recent transactions

### Actionable Flows

- **TRANSFER_001** — Execute money transfer with valid IBAN
- **TRANSFER_002** — Reject transfer with invalid IBAN

### Conversational Quality

- **CONVERSATIONAL_001** — Multi-turn context: follow-up after balance query
- **CONVERSATIONAL_002** — Clarification request for missing required field

### Determinism Variance

- **VARIANCE_001** — Semantic equivalence: rephrase same query

### Edge Cases Robustness

- **EDGE_CASE_001** — Handle empty/whitespace input
- **EDGE_CASE_002** — Handle very long input

### Performance

- **PERFORMANCE_001** — Chat response latency < 3 seconds

### Security Guardrails

- **SECURITY_001** — Reject SQL injection attempt
- **SECURITY_002** — Reject request for password/PIN

## 🧪 Cypress BDD Tests

**Total:** 73 scenarios (57 active, 16 skipped)

### Compatibility

5 active, 0 skipped

- ✅ [devices.feature] Chat interface renders on desktop viewport `compatibility, ui, slow, regression`
- ✅ [devices.feature] Chat interface renders on mobile viewport `compatibility, ui, slow, regression`
- ✅ [devices.feature] Chat interface renders on tablet viewport `compatibility, ui, slow, regression`
- ✅ [devices.feature] Chat messages wrap correctly on narrow viewport `compatibility, ui, slow, regression`
- ✅ [devices.feature] Chatbot is usable on touch screen (mobile interaction) `compatibility, ui, slow, regression`

### Context

4 active, 0 skipped

- ✅ [memory.feature] Chatbot clarifies ambiguous follow-up `conversational, regression, smoke`
- ✅ [memory.feature] Chatbot handles topic switch gracefully `conversational, regression, smoke`
- ✅ [memory.feature] Chatbot retains balance context for follow-up `conversational, regression, smoke`
- ✅ [memory.feature] Chatbot retains transfer intent across turns `conversational, regression, smoke`

### Conversational

2 active, 2 skipped

- ⏭️ [transfer_flow.feature] Complete transfer flow with valid IBAN `conversational, functional, ddt, skip`
- ✅ [transfer_flow.feature] Transfer flow — chatbot asks for amount when missing `conversational, functional, ddt`
- ✅ [transfer_flow.feature] Transfer flow — chatbot asks for IBAN when missing `conversational, functional, ddt`
- ⏭️ [transfer_flow.feature] User cancels transfer mid-flow `conversational, functional, ddt, skip`

### E2e

3 active, 1 skipped

- ✅ [user_journey.feature] Complete account overview journey `e2e, smoke, critical, regression`
- ⏭️ [user_journey.feature] Complete transfer journey with confirmation `e2e, smoke, critical, regression, skip`
- ✅ [user_journey.feature] Customer encounters a problem and gets help `e2e, smoke, critical, regression`
- ✅ [user_journey.feature] Customer queries balance then makes a transfer `e2e, smoke, critical, regression`

### Fallback

4 active, 2 skipped

- ✅ [error_handling.feature] Ambiguous request triggers clarification `fallback, robustness, regression`
- ✅ [error_handling.feature] Emoji input is handled `fallback, robustness, regression`
- ⏭️ [error_handling.feature] Empty input is handled gracefully `fallback, robustness, regression, skip`
- ⏭️ [error_handling.feature] Off-topic question is gracefully redirected `fallback, robustness, regression, skip`
- ✅ [error_handling.feature] Special characters are handled safely `fallback, robustness, regression`
- ✅ [error_handling.feature] Very long input does not crash the bot `fallback, robustness, regression`

### Functional

3 active, 2 skipped

- ✅ [account.feature] Multiple phrasings of balance query return consistent results **(Outline)** `functional, smoke, regression, ddt`
- ✅ [account.feature] Retrieve account balance `functional, smoke, regression, ddt`
- ⏭️ [account.feature] Retrieve card details `functional, smoke, regression, ddt, skip`
- ⏭️ [account.feature] Retrieve card limit `functional, smoke, regression, ddt, skip`
- ✅ [account.feature] Retrieve transaction history `functional, smoke, regression, ddt`

### Load

2 active, 2 skipped

- ✅ [concurrency.feature] Note — Full concurrent user load testing `load, slow, performance, note`
- ⏭️ [concurrency.feature] Response time stays within SLA under simulated load `load, slow, performance, skip`
- ⏭️ [concurrency.feature] Session recovers after a failed request `load, slow, performance, skip`
- ✅ [concurrency.feature] Single session handles rapid successive messages `load, slow, performance`

### Moderation

5 active, 0 skipped

- ✅ [toxicity.feature] Card theft report is handled urgently `moderation, security, regression`
- ✅ [toxicity.feature] Off-topic joke request is declined politely `moderation, security, regression`
- ✅ [toxicity.feature] Offensive language is de-escalated `moderation, security, regression`
- ✅ [toxicity.feature] Sensitive financial distress is handled empathetically `moderation, security, regression`
- ✅ [toxicity.feature] Toxic input is acknowledged professionally `moderation, security, regression`

### Performance

4 active, 0 skipped

- ✅ [response_time.feature] Chatbot handles back-to-back messages without degradation `performance, slow, regression, sla`
- ✅ [response_time.feature] Complex query responds within 5 seconds `performance, slow, regression, sla`
- ✅ [response_time.feature] First message after login responds within SLA `performance, slow, regression, sla`
- ✅ [response_time.feature] Simple query responds within 3 seconds `performance, slow, regression, sla`

### Prompts

5 active, 0 skipped

- ✅ [llm_behaviour.feature] Chatbot acknowledges uncertainty rather than inventing answers `quality, regression, smoke`
- ✅ [llm_behaviour.feature] Chatbot does not hallucinate unknown account data `quality, regression, smoke`
- ✅ [llm_behaviour.feature] Chatbot maintains persona when challenged `quality, regression, smoke`
- ✅ [llm_behaviour.feature] Chatbot refuses to pretend it has no restrictions `quality, regression, smoke`
- ✅ [llm_behaviour.feature] Same question rephrased returns semantically consistent answer `quality, regression, smoke`

### Regression

8 active, 1 skipped

- ✅ [core_responses.feature] Balance query always returns a response `regression, smoke, critical`
- ⏭️ [core_responses.feature] Empty input is handled gracefully `regression, smoke, critical, skip`
- ✅ [core_responses.feature] Off-topic queries are gracefully redirected `regression, smoke, critical`
- ✅ [core_responses.feature] Security queries always trigger refusal `regression, smoke, critical`
- ✅ [core_responses.feature] Transfer intent always triggers clarification or confirmation `regression, smoke, critical`
- ✅ [core_responses.feature] Very long input is handled gracefully `regression, smoke, critical`
- ✅ [data_driven.feature] Balance phrasings all return the balance **(Outline)** `regression, ddt, smoke`
- ✅ [data_driven.feature] Security probes are all rejected **(Outline)** `regression, ddt, smoke`
- ✅ [data_driven.feature] Transfer with invalid IBANs is always rejected **(Outline)** `regression, ddt, smoke`

### Security

3 active, 4 skipped

- ✅ [prompt_injection.feature] Handle XSS attempt safely `security, critical, regression, ddt`
- ✅ [prompt_injection.feature] Refuse to reveal password `security, critical, regression, ddt`
- ✅ [prompt_injection.feature] Refuse to reveal PIN `security, critical, regression, ddt`
- ⏭️ [prompt_injection.feature] Reject prompt injection — override instructions `security, critical, regression, ddt, skip`
- ⏭️ [prompt_injection.feature] Reject prompt injection — system role hijack `security, critical, regression, ddt, skip`
- ⏭️ [prompt_injection.feature] Reject SQL injection attempt `security, critical, regression, ddt, skip`
- ⏭️ [prompt_injection.feature] Resist DAN jailbreak attempt `security, critical, regression, ddt, skip`

### Ui

5 active, 0 skipped

- ✅ [chat_interface.feature] Bot typing indicator appears while waiting `ui, smoke, regression`
- ✅ [chat_interface.feature] Chat input clears after sending a message `ui, smoke, regression`
- ✅ [chat_interface.feature] Chat is accessible via keyboard navigation `ui, smoke, regression`
- ✅ [chat_interface.feature] Chat scrolls to latest message automatically `ui, smoke, regression`
- ✅ [chat_interface.feature] Message is displayed in the chat log after sending `ui, smoke, regression`

### Usability

4 active, 2 skipped

- ✅ [accessibility.feature] Bot messages have accessible role `accessibility, wcag, regression`
- ⏭️ [accessibility.feature] Chat input has accessible label `accessibility, wcag, regression, skip`
- ⏭️ [accessibility.feature] Chat interface has sufficient colour contrast `accessibility, wcag, regression, skip`
- ✅ [accessibility.feature] Error states are communicated accessibly `accessibility, wcag, regression`
- ✅ [accessibility.feature] Page title is descriptive `accessibility, wcag, regression`
- ✅ [accessibility.feature] Send button is keyboard accessible `accessibility, wcag, regression`

---

## Legend

- ✅ **Active** — Running normally
- ⏭️ **Skipped** — Flagged with @skip (pending app fixes or review)
- **(Outline)** — Scenario Outline (parameterized with Examples)

### Common Tags

- `@smoke` — Quick regression checks
- `@critical` — Critical path scenarios
- `@functional` — Feature functionality
- `@security` — Security & guardrails
- `@performance` — Performance validation
- `@skip` — Pending fixes (see comments in .feature file)
- `@regression` — Regression suite
- `@ddt` — Data-driven tests
