## Test Tags Reference

### Available Tags

Tags are used to filter and categorize tests. They can be run with:

```bash
npx cypress run --spec "cypress/e2e/**/*.feature" --grep "@smoke"
npx cypress run --spec "cypress/e2e/**/*.cy.ts" --grep "@security"
```

#### Category Tags

| Tag               | Purpose                               | Example Specs                                                    |
| ----------------- | ------------------------------------- | ---------------------------------------------------------------- |
| `@smoke`          | Fast, critical tests; run first in CI | functional/account, regression/core_responses, ui/chat_interface |
| `@regression`     | Regression test suite                 | Most specs                                                       |
| `@functional`     | Feature-specific functionality        | account queries, transfer flows                                  |
| `@conversational` | Multi-turn context tests              | memory, transfer flows                                           |
| `@security`       | Security guardrails & exploits        | prompt injection, moderation                                     |
| `@performance`    | Latency & throughput tests            | response_time, load/concurrency                                  |
| `@ui`             | UI/UX interaction tests               | chat_interface, compatibility                                    |
| `@accessibility`  | WCAG AA compliance                    | usability/accessibility                                          |
| `@compatibility`  | Device/viewport compatibility         | devices                                                          |
| `@fallback`       | Error handling & edge cases           | error_handling                                                   |
| `@moderation`     | Content policy & toxicity             | toxicity                                                         |
| `@quality`        | LLM response quality                  | llm_behaviour                                                    |
| `@e2e`            | End-to-end user journeys              | user_journey                                                     |

#### Performance Tags

| Tag     | Purpose                                 | Example Specs                    |
| ------- | --------------------------------------- | -------------------------------- |
| `@slow` | Long-running tests (skip in pre-commit) | performance, compatibility, load |
| `@sla`  | SLA/latency critical                    | response_time                    |

#### Testing Pattern Tags

| Tag    | Purpose                                 | Example Specs                     |
| ------ | --------------------------------------- | --------------------------------- |
| `@ddt` | Data-Driven Testing; parametrized tests | Most .cy.ts and Scenario Outlines |

#### Suggested Pre-Commit Hook

```bash
# Fast smoke tests only (< 2 min)
npx cypress run --grep "@smoke"
```

#### Suggested CI Full Suite

```bash
# All tests
npx cypress run
npm run harness  # API tests separately
```

#### Suggested Nightly Run

```bash
# Include slow tests
npx cypress run  # Includes all tags
```

### How to Use

**Run by tag:**

```bash
# Only smoke tests
npx cypress run --spec "cypress/e2e/**/*.feature" --grep "@smoke"

# Only security tests
npx cypress run --grep "@security"

# Exclude slow tests (for pre-commit)
npx cypress run --grep "^(?!.*@slow).*"
```

**Combined tags:**

```bash
# Regression tests that are not slow
npx cypress run --grep "@regression.*(?!@slow)"

# Security + critical
npx cypress run --grep "@security.*@critical"
```

### Tag Convention

- **Feature files:** Tags added before `Feature:` keyword

  ```gherkin
  @functional @smoke @regression @ddt
  Feature: Functional Account Queries
  ```

- **TypeScript tests:** Tags in describe string and JSDoc comments
  ```typescript
  /**
   * account.cy.ts
   * @tags @functional @smoke @regression @ddt
   */
  describe('@functional @smoke Account Data — UI Tests', () => {
  ```
