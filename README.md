# Banking AI Validator

A **production-grade API + BDD test framework** for validating AI chatbot functionality in banking systems. Combines **API testing** (fast, reliable) with **BDD/Cypress UI testing** (readable, maintainable) to test data accuracy, security, conversational quality, and robustness.

---

## 🎯 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Run all tests (both API + BDD UI)
npm run test

# Or run separately
npm run harness              # API tests only (2 min)
npm run cypress:bdd          # BDD feature tests (5-10 min)
npm run cypress:open         # Interactive Cypress runner
```

---

## 📦 What's Included

### 🔧 API Test Framework (Fast & Reliable)

- **14 test cases** with hybrid scoring (rule-based + LLM-as-judge)
- **9 rule types** for precise validation
- **JSON reporting** for CI/CD integration
- **~2 minutes execution time**

```bash
npm run harness              # All 14 tests
npm run harness:account      # Filter by category
npm run harness:security
npm run harness:transfer
```

### 🧪 UI Test Framework (BDD + Cypress)

- **Cypress E2E automation** with Gherkin/BDD (feature files)
- **20+ test scenarios** covering user journeys
- **Step definitions** for reusable, readable test logic
- **Screenshots & videos** on failures
- **Interactive test runner** for development

```bash
npm run cypress:open         # Open interactive runner
npm run cypress:run          # Run headless
npm run cypress:bdd          # Run BDD feature tests
npm run cypress:account      # Run specific suite
```

---

## 🏗️ Project Structure

```
meridian-banking-chatbot-harness/
│
├── 🔧 API Tests
│   └── tests/harness/
│       ├── harness.ts          # Orchestrator
│       ├── scorer.ts           # Scoring engine
│       ├── chat-client.ts      # HTTP client
│       ├── test-cases.json     # 14 test definitions
│       └── test-results/       # JSON reports
│
├── 🧪 UI Tests (Cypress + BDD)
│   ├── cypress/
│   │   ├── e2e/                # Gherkin feature files (BDD)
│   │   │   ├── account/
│   │   │   ├── security/
│   │   │   ├── conversational/
│   │   │   ├── functional/
│   │   │   ├── load/
│   │   │   ├── performance/
│   │   │   ├── compatibility/
│   │   │   ├── context/
│   │   │   ├── fallback/
│   │   │   ├── moderation/
│   │   │   ├── prompts/
│   │   │   ├── regression/
│   │   │   ├── ui/
│   │   │   ├── usability/
│   │   │   └── e2e/
│   │   ├── support/
│   │   │   ├── step_definitions/    # Gherkin step implementations
│   │   │   ├── pages/               # Page Object Model (ChatPage)
│   │   │   ├── factories/           # Test data factories
│   │   │   ├── commands.ts
│   │   │   └── e2e.ts
│   │   └── screenshots/ & videos/   # Test artifacts
│   └── cypress.config.js
│
├── 📖 Documentation
│   ├── README.md               # This file
│   ├── HYBRID_TESTING.md       # Hybrid approach explained
│   ├── APPROACH_NOTE.md        # Testing philosophy
│   ├── STRATEGY_NOTE.md        # Scaling roadmap
│   └── GIT_HOOKS_SETUP.md      # Code quality hooks
│
└── ⚙️ Configuration
    ├── package.json
    ├── tsconfig.json
    ├── cypress.config.js
    └── .husky/                 # Git hooks
```

---

## 📊 Test Coverage (30 Total)

| Category       | API    | UI     | Total  |
| -------------- | ------ | ------ | ------ |
| Account Data   | 4      | 5      | **9**  |
| Transfers      | 2      | 3      | **5**  |
| Security       | 2      | 3      | **5**  |
| Performance    | 1      | 1      | **2**  |
| Conversational | 2      | 2      | **4**  |
| Edge Cases     | 2      | 2      | **4**  |
| **TOTAL**      | **14** | **16** | **30** |

---

## 🚀 Common Commands

### API Tests

```bash
npm run harness              # All 14 API tests
npm run harness:verbose      # With detailed output
npm run harness:account      # Filter by category
npm run harness:security
npm run harness:transfer
```

### UI Tests

```bash
npm run cypress:open         # Interactive runner
npm run cypress:run          # Headless
npm run cypress:account      # Specific suite
npm run cypress:security
npm run cypress:transfer
npm run cypress:performance
```

### Reports & Visualization

```bash
npm run convert:allure       # Convert test results to Allure format
npm run report               # Generate interactive Allure HTML report
npm run report:open          # Open report in browser
npm run report:clean         # Delete old reports
npm run ci:test              # Run tests + generate report (one command)
```

### Both

```bash
npm run test                 # Run all tests (API + UI)
```

### Code Quality

```bash
npm run lint                 # Check with Biome
npm run lint:fix             # Auto-fix issues
npm run format               # Format all files
npm run docs:scenarios       # Generate SCENARIOS.md inventory
```

---

## � Scenarios Inventory

Comprehensive, always-up-to-date inventory of all test scenarios across API and BDD tests.

### Auto-Generation

The project automatically generates **[SCENARIOS.md](./SCENARIOS.md)** with:

- ✅ All **API tests** (14 cases) organized by category
- ✅ All **BDD scenarios** (73 total, 57 active, 16 skipped) grouped by feature
- ✅ **Status indicators** (✅ active, ⏭️ skipped)
- ✅ **Tags** for filtering and organization
- ✅ **Scenario Outline** markers for parameterized tests

### Manual Generation

```bash
npm run docs:scenarios
```

### Automatic Generation

The file auto-generates before every commit if `.feature` or `test-cases.json` files change:

```bash
git add cypress/e2e/my-feature.feature
git commit -m "Add new scenario"  # SCENARIOS.md auto-updated and committed
```

Powered by `.husky/pre-commit` hook — no manual action needed!

### Usage

- **Check current scenarios**: Open [SCENARIOS.md](./SCENARIOS.md)
- **Find by tag**: Use browser Find (Ctrl+F) to search tags like `@critical`, `@skip`, `@security`
- **Track skipped**: All `@skip` scenarios listed for quick review
- **Scope tests**: Count scenarios per category for coverage assessment

---

### API + BDD UI Strategy

| Aspect          | API Tests             | BDD UI Tests         |
| --------------- | --------------------- | -------------------- |
| **Speed**       | ⚡⚡⚡ 2 min          | ⚡⚡ 5-10 min        |
| **Coverage**    | Logic-focused         | User journey-focused |
| **Reliability** | 99%+                  | 95%+                 |
| **Format**      | TypeScript            | Gherkin (BDD)        |
| **Best for**    | Fast feedback (CI/CD) | Real UX validation   |

### BDD Approach (Cypress + Gherkin)

- **Feature files** (`*.feature`) in Gherkin syntax for readable test scenarios
- **Step definitions** (`chatbot.steps.ts`) for reusable, composable test logic
- **Page Object Model** (`ChatPage`) for UI interactions
- **Message Factory** for test data and variants
- **@skip tags** on scenarios pending implementation or app-level fixes
- **Cucumber preprocessor** for seamless feature file execution

**Read [HYBRID_TESTING.md](./docs/HYBRID_TESTING.md) for full explanation**

---

## 📋 Scoring Logic

### API Tests: Rule-Based + LLM-as-Judge

- **9 rule types** (exact_match, contains, regex, latency, http_status, etc.)
- **Weighted evaluation** (configurable per rule)
- **Pass threshold:** ≥75% of weighted rules
- **LLM-as-judge:** Claude 3.5 Sonnet for semantic evaluation

### UI Tests: User Action Validation

- **Custom Cypress commands** for readable tests
- **Real browser interaction** (clicks, typing, waits)
- **Assertions** on UI elements and response times

---

## 🏛️ UI Testing Architecture

### Page Object Model (POM)

The `ChatPage` class encapsulates all DOM interactions:

```typescript
// All interactions go through ChatPage
ChatPage.open(); // Navigate to chatbot
ChatPage.dismissModal(); // Close modal dialogs
ChatPage.openAssistant(); // Open chat interface
ChatPage.chat(message); // Send message
ChatPage.getLastBotMessage(); // Get bot response
```

### Gherkin Step Definitions

Reusable steps for readable scenarios:

```gherkin
Given('I am logged into the Meridian chatbot')
When('I ask "<question>"')
When('I send the message "<text>"')
Then('the bot responds with my balance')
Then('the response contains "<keyword>"')
And('the response matches "<pattern>"')
```

All steps are implemented in `cypress/support/step_definitions/chatbot.steps.ts` (~450+ lines, 50+ step definitions).

### Message Factory

Test data repository with categorized message variants:

```typescript
MessageFactory.security.sqlInjection[]    // SQL injection probes
MessageFactory.security.promptInjection[] // Prompt injection attempts
MessageFactory.transfer.*                 // Transfer flow messages
MessageFactory.account.*                  // Account query messages
```

---

## 📊 Test Scenarios (20+)

### Status

- ✅ **Active:** Most scenarios execute successfully
- ⏭️ **@skip:** Scenarios pending app-level fixes (flagged with @skip tag)
  - Prompt injection (system-level attack vectors)
  - Transfer flow with specific validation sequences
  - Load testing (better suited for dedicated load tools)
  - Some accessibility tests (application-level missing features)

### Coverage by Category

| Category       | Feature Files              | Scenarios |
| -------------- | -------------------------- | --------- |
| Functional     | account.feature            | 5+        |
| Security       | prompt_injection.feature   | 8         |
| Conversational | transfer_flow.feature      | 4+        |
| Context        | memory.feature             | 3+        |
| Fallback       | error_handling.feature     | 4         |
| Load Testing   | concurrency.feature        | 3         |
| Performance    | performance.feature        | 2         |
| Compatibility  | devices.feature            | 4+        |
| UI/UX          | chat_interface.feature     | 5         |
| Usability      | accessibility.feature      | 3+        |
| Regression     | core_responses.feature     | 4         |
| Moderation     | content_moderation.feature | 3         |
| Prompts        | prompt_quality.feature     | 2         |

---

## 🔧 Tools & Technologies

### Core

- **TypeScript 6.0.3** — Type-safe code
- **Node.js 16+** — Runtime
- **npm** — Dependency management

### API Testing

- **ts-node** — Execute TypeScript directly
- **Fetch API** — HTTP communication
- **@anthropic-ai/sdk** — LLM-as-judge scoring

### UI Testing

- **Cypress 15.15.0** — E2E automation
- **@badeball/cypress-cucumber-preprocessor** — BDD support
- **esbuild** — Bundling

### Code Quality

- **Biome 2.4.15** — Fast linting & formatting
- **Husky 9.1.7** — Git hooks
- **lint-staged** — Pre-commit checks

---

## 📖 Documentation

- **[HYBRID_TESTING.md](./docs/HYBRID_TESTING.md)** — Hybrid approach (recommended reading)
- **[APPROACH_NOTE.md](./docs/APPROACH_NOTE.md)** — Testing philosophy & coverage
- **[STRATEGY_NOTE.md](./docs/STRATEGY_NOTE.md)** — 5-phase production scaling
- **[GIT_HOOKS_SETUP.md](./docs/GIT_HOOKS_SETUP.md)** — Code quality automation
- **[ALLURE_SETUP.md](./docs/ALLURE_SETUP.md)** — Test reporting & GitHub Pages setup
- **[cypress/README.md](./cypress/README.md)** — Cypress-specific guide
- **[tests/harness/README.md](./tests/harness/README.md)** — API testing guide

---

## 🎓 Interview Talking Points

### "Why Cypress + BDD + API Tests?"

> "I use API tests for speed (no browser overhead) and reliability, catching bugs early in CI/CD. BDD/Gherkin feature files provide readable test scenarios that stakeholders can understand. Step definitions keep code DRY and maintainable. Together they're comprehensive yet cost-effective."

### "What's the benefit of BDD?"

> "Gherkin syntax makes tests self-documenting and enables non-technical stakeholders to understand scenarios. Step definitions create a reusable vocabulary of test actions. This scales better than writing individual test files."

### "Why Cypress for UI tests?"

> "Cypress runs in the same process as the browser, avoiding flakiness from cross-tab communication. It has excellent debugging (time travel), better error messages, and strong developer experience."

### "How do you handle app-level issues that block tests?"

> "I use @skip tags to flag scenarios waiting for app fixes, keeping the test suite clean while documenting intent. The README tracks which scenarios are skipped and why."

### "Scaling strategy?"

> "Phase 1 (current): Baseline regression protection. Phase 2: Parallelization + load testing. Phase 3: Human review loop. Phase 4: Telemetry. Phase 5: Anomaly detection."

---

## 🔄 Recent Architecture Changes

### Consolidation to BDD-Only UI Tests

**What Changed:**

- Removed 6 duplicate `.cy.ts` test files (account.cy.ts, security.cy.ts, transfer.cy.ts, performance.cy.ts, factory_regression.cy.ts, diagnostic.cy.ts)
- Migrated all scenarios to Gherkin feature files with step definitions
- Implemented 50+ step definitions in `cypress/support/step_definitions/chatbot.steps.ts`
- Added @skip tags to scenarios pending app-level fixes

**Why:**

- Eliminate code duplication and maintenance burden
- Improve test readability via Gherkin syntax
- Enable scenario-level granularity with @skip, @only, @critical tags
- Prepare for parallelization and parallel execution

**Impact:**

- ✅ Single source of truth (feature files only)
- ✅ More maintainable (DRY step definitions)
- ✅ Better documentation (stakeholders can read .feature files)
- ✅ Cleaner git history (no duplicate test implementations)

### Type Safety & Error Handling

- Fixed TypeScript type errors in `scorer.ts` and `harness.ts`
- Added proper error handling for `unknown` type exceptions
- Improved Cypress exception handler for app-level errors

---

## 🎯 Key Features

✨ **API + BDD Testing** — API tests for speed, BDD for maintainability  
⚡ **Fast Feedback** — API tests in 2 minutes  
🎨 **Real UX Testing** — Cypress validates user experience  
🔐 **Type-Safe** — 100% TypeScript, strict mode  
📊 **Rich Reports** — Allure HTML reports + automated GitHub Pages  
🧹 **Code Quality** — Biome + Husky + lint-staged  
📚 **Well-Documented** — 10+ documentation files  
🚀 **Production-Ready** — Enterprise-grade setup

---

## 📈 Test Reports & Visualization

### Local Allure Reports

Generate beautiful, interactive test reports locally:

```bash
# Generate report from latest test results
npm run report

# Open in browser
npm run report:open

# Clean old reports
npm run report:clean
```

### What's in the Report

- ✅ Test pass/fail status and scores
- 📊 Overall statistics and trends
- 🎯 Tests grouped by category
- ⏱️ Execution timeline
- 🔍 Detailed failure information
- 📈 Historical tracking

### GitHub Pages Deployment

Reports automatically deploy to GitHub Pages on every push:

```
https://rainiersales.github.io/banking-ai-validator/reports/<run-number>/
```

**Features:**

- ✅ Automatic deployment via GitHub Actions
- ✅ Historical reports (one per test run)
- ✅ Team-accessible via public URL
- ✅ 30-90 day artifact retention

### CI/CD Reporting

Automatically runs tests and generates reports:

```bash
# One command: test + report
npm run ci:test
```

**GitHub Actions Workflow:**

- Auto-triggers on push to `main` / `develop`
- Auto-triggers on pull requests
- Generates Allure report
- Comments on PRs with report link
- Deploys to GitHub Pages

👉 **See [ALLURE_SETUP.md](./docs/ALLURE_SETUP.md) for complete reporting setup guide**

---

## ⚙️ Configuration

### Environment Variables

Create `.env`:

```env
BASE_URL=https://2ndround.sandb0x.run
CHATBOT_TOKEN=kwpw-fees-19bg-fm6z-svqr-d29p8n
ANTHROPIC_API_KEY=sk-ant-...  # For LLM-as-judge
```

### Timeouts

- **Request timeout:** 10 seconds
- **Cypress timeout:** 10 seconds
- **Test execution:** ~2 min (API) + ~5-10 min (UI)

---

## 🚀 Getting Started

1. **Clone & Install**

   ```bash
   npm install
   ```

2. **Run API Tests**

   ```bash
   npm run harness
   ```

3. **Run UI Tests**

   ```bash
   npm run cypress:open  # Interactive
   npm run cypress:run   # Headless
   ```

4. **Generate & View Reports**

   ```bash
   npm run report        # Generate Allure report
   npm run report:open   # View in browser
   ```

5. **View Reports**
   ```
   tests/harness/test-results/        (JSON reports)
   allure-report/index.html           (HTML Allure report)
   cypress/screenshots/               (on UI test failure)
   cypress/videos/                    (on UI test failure)
   ```

---

## 📞 Support

- **API Testing Issues?** → See [tests/harness/README.md](./tests/harness/README.md)
- **UI Testing Issues?** → See [cypress/README.md](./cypress/README.md)
- **Reports & CI/CD?** → See [ALLURE_SETUP.md](./docs/ALLURE_SETUP.md)
- **Architecture Questions?** → See [HYBRID_TESTING.md](./docs/HYBRID_TESTING.md)
- **Scaling Strategy?** → See [STRATEGY_NOTE.md](./docs/STRATEGY_NOTE.md)

---

**Status:** ✅ Production Ready | **Framework:** Hybrid (API + UI) | **Last Updated:** May 16, 2026

---

## 📦 Project Structure

```
qa-chatbot-harness/
├── tests/harness/
│   ├── harness.ts              ← Main test orchestrator
│   ├── scorer.ts               ← Scoring engine (9 rule types + LLM-judge)
│   ├── chat-client.ts          ← API client for all endpoints
│   ├── test-cases.json         ← 14 test case definitions
│   ├── package.json            ← npm dependencies
│   ├── tsconfig.json           ← TypeScript config
│   ├── .env.example            ← Configuration template
│   ├── README.md               ← Harness quick start
│   └── test-results/           ← Generated JSON reports
│
├── scripts/
│   └── convert-to-allure.ts    ← Convert test results to Allure format
│
├── .github/workflows/
│   └── test-and-report.yml     ← GitHub Actions CI/CD pipeline
│
├── cypress/                    ← UI/E2E tests
│   ├── e2e/
│   ├── support/
│   └── README.md
│
├── docs/
│   ├── APPROACH_NOTE.md        ← Testing philosophy
│   ├── STRATEGY_NOTE.md        ← Scaling roadmap
│   ├── HYBRID_TESTING.md       ← Hybrid approach
│   └── GIT_HOOKS_SETUP.md      ← Git hooks
│
├── ALLURE_SETUP.md             ← Test reporting setup
├── allure.config.js            ← Allure report configuration
├── package.json                ← Root npm config
├── tsconfig.json               ← Root TypeScript config
├── cypress.config.js           ← Cypress configuration
└── README.md                   ← This file
```

---

## 🧪 Test Coverage (15 Cases)

### Account Data Accuracy (5 tests)

Validates factual queries about balance, card details, limits, transactions.

- `ACCOUNT_001` — Balance query
- `ACCOUNT_002` — Card details
- `ACCOUNT_003` — Card limits
- `ACCURACY_001` — Transaction history
- `VARIANCE_001` — Semantic equivalence

### Actionable Flows (2 tests)

Tests multi-turn conversation sequences for transfers and actions.

- `TRANSFER_001` — Valid transfer execution
- `TRANSFER_002` — Invalid IBAN rejection

### Security Guardrails (2 tests)

Validates resistance to SQL injection and credential exposure.

- `SECURITY_001` — SQL injection attempt
- `SECURITY_002` — PIN/password request

### Conversational Quality (2 tests)

Evaluates multi-turn context and clarity.

- `CONVERSATIONAL_001` — Multi-turn context maintenance
- `CONVERSATIONAL_002` — Clarification requests

### Robustness (2 tests)

Boundary testing for stability.

- `EDGE_CASE_001` — Empty/whitespace input
- `EDGE_CASE_002` — Very long input

### Performance (1 test)

- `PERFORMANCE_001` — Response latency < 3 seconds

---

## 📊 Scoring Approach

### Rule-Based Scoring (13 tests)

Pattern matching with multiple rule types:

- `exact_match` — Exact value present
- `contains` — Keywords present
- `not_contains` — Forbidden content absent
- `regex` — Pattern matching
- `latency` — Response time threshold
- `http_status` — HTTP status code
- And more...

**Pass Threshold:** ≥75% of weighted rules

### LLM-as-Judge Scoring (2 tests)

Claude 3.5 Sonnet evaluates semantic quality on 0-5 scale.

**Pass Threshold:** ≥3/5 (60/100)

---

## 🔧 Tools & Technologies

### Test Automation

- **TypeScript** — Type-safe test code
- **ts-node** — Execute TypeScript directly
- **@anthropic-ai/sdk** — LLM-as-judge integration

### Code Quality

- **Biome** — Fast linting & formatting
- **ESLint & Prettier alternative** — 2x faster than ESLint

### Development

- **npm** — Dependency management
- **.env** — Environment configuration

---

## 📖 Documentation

- **[APPROACH_NOTE.md](./docs/APPROACH_NOTE.md)** — Testing philosophy, coverage decisions, consciously descoped items
- **[STRATEGY_NOTE.md](./docs/STRATEGY_NOTE.md)** — 5-phase roadmap for production scaling
- **[AI_TOOL_LOG.md](./docs/AI_TOOL_LOG.md)** — AI tools used, purpose, verification methods
- **[DELIVERABLES.md](./docs/DELIVERABLES.md)** — Complete submission checklist

---

## 🚀 Usage Examples

### Basic execution

```bash
npm run harness
```

### Verbose output with details

```bash
npm run harness:verbose
```

### Filter by test category

```bash
npm run harness:account       # Only ACCOUNT_* tests
npm run harness:security      # Only SECURITY_* tests
npm run harness:transfer      # Only TRANSFER_* tests
```

### Custom environment

```bash
BASE_URL=https://custom.url CHATBOT_TOKEN=your-token npm run harness
```

---

## 📊 Output Example

```
🚀 Starting Meridian Banking Chatbot Test Harness
   Base URL: https://2ndround.sandb0x.run
   Token: kwpw-fees-19b...

✓ Loaded 15 test cases

🧪 Running 15 test case(s)...

[ACCOUNT_001] ✓ PASS (100/100)
[ACCOUNT_002] ✓ PASS (100/100)
[TRANSFER_001] ✓ PASS (94/100)
[SECURITY_001] ✓ PASS (100/100)
...

✓ Report written to test-results/report-2026-05-16T10-32-45.json

CHATBOT TEST EXECUTION SUMMARY
Results: 14/15 tests passed (93%)
Average Score: 86/100
```

---

## 🔒 Security

- ✅ No credential exposure — PIN/password requests rejected
- ✅ Injection prevention — SQL injection detected and blocked
- ✅ API key isolation — .env keeps secrets out of code

---

## ⚙️ Configuration

Copy `.env.example` to `.env` and update:

```env
BASE_URL=https://2ndround.sandb0x.run
CHATBOT_TOKEN=your-session-token
ANTHROPIC_API_KEY=sk-ant-...
REQUEST_TIMEOUT=10000
VERBOSE=false
```

---

## 📝 Known Limitations

1. **Non-Deterministic LLM** — Responses vary; we test consistency in facts, not phrasing
2. **Synthetic Data** — Account balances fixed; real patterns unknown
3. **Single Session** — No concurrent user testing
4. **English Only** — Prompts not internationalized
5. **Baseline Security** — Not a comprehensive pentest

---

## 🎓 For the Interview

Be prepared to discuss:

- Test case selection rationale
- Scoring logic (rule weights, thresholds)
- Variance handling (LLM non-determinism)
- Security gaps and why not tested
- Scaling strategy (Phase 1-5)
- Tool choices (why LLM-as-judge)

---

## 📞 Support

- Check [APPROACH_NOTE.md](./docs/APPROACH_NOTE.md) for testing philosophy
- Check [STRATEGY_NOTE.md](./docs/STRATEGY_NOTE.md) for scaling recommendations
- Review test results JSON for detailed failure analysis
- Check [AI_TOOL_LOG.md](./docs/AI_TOOL_LOG.md) for methodology

---

**Status:** ✅ Production Ready | **Last Updated:** May 16, 2026
