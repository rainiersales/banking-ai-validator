# Hybrid Testing Framework — API + UI Automation

## 🎯 Architecture Overview

This project implements a **hybrid testing approach** combining two complementary strategies:

```
┌────────────────────────────────────────────────────┐
│  Meridian Banking Chatbot Test Suite               │
├────────────────────────────────────────────────────┤
│                                                    │
│  1. API Testing (tests/harness/)                  │
│     ├─ Direct API calls via HTTP                  │
│     ├─ Hybrid scoring (rules + LLM-as-judge)     │
│     ├─ Fast execution (~2 minutes)                │
│     ├─ 14 test cases                              │
│     └─ Best for: Data accuracy, security logic    │
│                                                    │
│  2. UI Testing (cypress/)                         │
│     ├─ Cypress E2E automation                     │
│     ├─ Real browser interaction                   │
│     ├─ Screenshots & videos on failure            │
│     ├─ 20+ test scenarios                         │
│     └─ Best for: UX, UI flow, integration         │
│                                                    │
│  Shared: scorer.ts (scoring engine)               │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 📋 When to Use Each

### ✅ API Tests (tests/harness/)

- **Speed:** ⚡⚡⚡ Fast (no browser)
- **Reliability:** Very high (no UI flakiness)
- **Coverage:** Deep (test logic directly)
- **Best for:**
  - Data accuracy validation
  - Security checks (injection, credential exposure)
  - Performance benchmarks
  - Rapid feedback loops (CI/CD)

**Example:**

```bash
npm run harness          # All 14 API tests in ~2 minutes
npm run harness:security # Security tests only
```

### ✅ UI Tests (cypress/)

- **Speed:** ⚡⚡ Medium (browser overhead)
- **Realism:** Very high (real user experience)
- **Coverage:** Integration (full flow)
- **Best for:**
  - User journey testing
  - UI element visibility
  - Multi-step interactions
  - Business flow validation

**Example:**

```bash
npm run cypress:open         # Interactive test runner
npm run cypress:transfer     # Transfer flow tests
npm run cypress:run          # All UI tests headless
```

---

## 🚀 Running Tests

### API Testing Only

```bash
npm run harness
```

### UI Testing Only

```bash
# Open Cypress UI (interactive)
npm run cypress:open

# Run headless
npm run cypress:run

# Run specific test file
npm run cypress:account
```

### Both (Full Suite)

```bash
npm run test  # Runs both harness + cypress
```

### By Category

**API Tests:**

```bash
npm run harness:account
npm run harness:security
npm run harness:transfer
```

**UI Tests:**

```bash
npm run cypress:account
npm run cypress:security
npm run cypress:transfer
npm run cypress:performance
```

---

## 📂 Project Structure

```
meridian-banking-chatbot-harness/
│
├── 🔧 API Tests
│   └── tests/harness/
│       ├── harness.ts          # Orchestrator
│       ├── scorer.ts           # Scoring engine
│       ├── chat-client.ts      # HTTP client
│       ├── test-cases.json     # Test definitions
│       └── test-results/       # Generated reports
│
├── 🧪 UI Tests (NEW)
│   ├── cypress/
│   │   ├── e2e/
│   │   │   ├── account.cy.ts        # Account tests
│   │   │   ├── security.cy.ts       # Security tests
│   │   │   ├── transfer.cy.ts       # Transfer tests
│   │   │   └── performance.cy.ts    # Performance tests
│   │   │
│   │   └── support/
│   │       ├── e2e.ts               # Setup
│   │       └── commands.ts          # Custom commands
│   │
│   └── cypress.config.js        # Cypress config
│
├── 📖 Documentation
│   ├── README.md
│   ├── HYBRID_TESTING.md        # This file
│   ├── APPROACH_NOTE.md
│   ├── STRATEGY_NOTE.md
│   └── ...
│
└── ⚙️ Configuration
    ├── package.json
    ├── tsconfig.json
    └── cypress.config.js
```

---

## 🧬 Cypress Custom Commands

### `cy.loginMeridian()`

Login with session token.

```typescript
cy.loginMeridian();
```

### `cy.sendChatMessage(text)`

Type and send message in chat.

```typescript
cy.sendChatMessage("What is my balance?");
```

### `cy.getLastBotMessage()`

Get the latest bot response.

```typescript
cy.getLastBotMessage().should("contain.text", "€");
```

### `cy.verifyBotResponse(text)`

Verify bot response contains text.

```typescript
cy.verifyBotResponse("€2,668.83");
```

### `cy.sendMessageViaAPI(text)`

Send message via API (not UI).

```typescript
cy.sendMessageViaAPI("What is my balance?").then((response) => {
  expect(response.status).to.equal(200);
});
```

---

## 🧪 Test Coverage Summary

| Category       | API Tests | UI Tests | Total  |
| -------------- | --------- | -------- | ------ |
| Account Data   | 4         | 5        | **9**  |
| Transfers      | 2         | 3        | **5**  |
| Security       | 2         | 3        | **5**  |
| Performance    | 1         | 1        | **2**  |
| Conversational | 2         | 2        | **4**  |
| Edge Cases     | 2         | 2        | **4**  |
| **TOTAL**      | **14**    | **16**   | **30** |

---

## 📊 Comparison Matrix

| Metric                   | API Tests     | UI Tests             |
| ------------------------ | ------------- | -------------------- |
| **Speed**                | 2 min         | 5-10 min             |
| **Reliability**          | 99%+          | 95%+                 |
| **Coverage**             | Logic-focused | Flow-focused         |
| **Maintenance**          | Low           | Medium               |
| **Real User Simulation** | No            | Yes                  |
| **Debug Info**           | JSON reports  | Screenshots + videos |
| **Best for CI/CD**       | Yes (fast)    | No (slow)            |

---

## 🎯 Hybrid Strategy Benefits

✅ **Comprehensive Coverage** — Both logic and flow  
✅ **Complementary** — API catches bugs fast, UI validates UX  
✅ **Flexible** — Use appropriate tool for each scenario  
✅ **Cost-Effective** — API tests for quick feedback, UI tests for critical paths  
✅ **Maintainable** — Clear separation of concerns  
✅ **Production-Ready** — Both frameworks proven in enterprise

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

The project includes an automated testing pipeline (`.github/workflows/test-and-report.yml`) that:

1. **Runs Tests** — Execute all 14 API tests
2. **Generates Reports** — Convert results to Allure format
3. **Creates Visualizations** — Generate interactive HTML reports
4. **Deploys** — Publish reports to GitHub Pages
5. **Notifies** — Comment on PRs with report links

### Automated Pipeline

```yaml
on: [push, pull_request]

jobs:
  test-and-report:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup Node.js
      - npm ci
      - npm run harness # API tests
      - npm run report # Generate Allure report
      - upload artifacts
      - deploy to GitHub Pages
```

### Generate Reports Locally

```bash
# Run tests
npm run harness

# Generate Allure report
npm run report

# View in browser
npm run report:open
```

### Access Reports

**Local:**

```
allure-report/index.html
```

**GitHub Pages (CI/CD):**

```
https://rainiersales.github.io/banking-ai-validator/reports/<run-number>/
```

**Features:**

- ✅ Interactive test visualizations
- ✅ Pass/fail statistics
- ✅ Test timeline
- ✅ Failure details
- ✅ Historical trends
- ✅ Team-accessible URL

See [ALLURE_SETUP.md](./ALLURE_SETUP.md) for complete reporting setup.

---

## 🎓 Interview Talking Points

### "Why Hybrid Approach?"

> "I use API tests for speed and reliability (14 tests in 2 minutes), and Cypress for realistic user journey validation. Each tool excels at its strength."

### "Which is better?"

> "Neither alone. API tests catch bugs fast; UI tests validate real user experience. Together they're more effective."

### "How do you maintain both?"

> "Clear separation: API tests are logic-focused (no browser), UI tests are flow-focused (with browser). Shared scoring logic via scorer.ts."

### "Cost/Benefit?"

> "API tests: cheap + fast (CI/CD friendly). UI tests: more expensive + slower (critical path only). Balance between speed and confidence."

### "How do you report results?"

> "Automated Allure Reports on every push. GitHub Actions runs tests → generates beautiful HTML reports → deploys to GitHub Pages. Team has instant access to test results and historical trends."

---

## 🚀 Next Steps

1. **Run API tests first:**

   ```bash
   npm run harness
   ```

2. **Run UI tests:**

   ```bash
   npm run cypress:run
   ```

3. **Run both:**

   ```bash
   npm run test
   ```

4. **Interactive development:**
   ```bash
   npm run cypress:open
   ```

---

## 📚 Related Documentation

- [APPROACH_NOTE.md](./APPROACH_NOTE.md) — Testing philosophy
- [STRATEGY_NOTE.md](./STRATEGY_NOTE.md) — Scaling roadmap
- [README.md](./README.md) — Main documentation

---

**Status:** ✅ Hybrid Framework Ready | **Last Updated:** May 16, 2026
