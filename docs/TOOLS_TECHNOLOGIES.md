# Tools & Technologies

## Core Technologies

### TypeScript 6.0.3

- **Type-safe code** across all test logic
- Strict mode enabled
- ~3,000 LOC of type-safe test code

### Node.js 16+

- Runtime environment
- Used for all tooling and test orchestration

### npm

- Dependency management
- Task automation via package.json scripts

## API Testing Stack

### ts-node

- Executes TypeScript directly without compilation
- Used for test harness execution
- Command: `npm run harness`

### Fetch API

- Native HTTP communication
- No external HTTP libraries required
- Built-in browser standard

### @anthropic-ai/sdk 0.24.0

- **LLM-as-judge integration**
- Claude 3.5 Sonnet for semantic evaluation
- Pricing: ~$0.01/test, ~$0.15 for full 14-test run

## UI Testing Stack

### Cypress 15.15.0

- **E2E automation framework**
- Real browser testing
- Fast and reliable
- Command: `npm run cypress:open` or `npm run cypress:run`

### @badeball/cypress-cucumber-preprocessor 24.0.1

- **BDD support** via Gherkin
- Feature file parsing and execution
- Step definition integration
- 73 total scenarios (57 active, 16 skipped)

### esbuild 0.28.0

- Fast bundling for preprocessor
- Zero-config bundling

## Code Quality Stack

### Biome 2.4.15

- **Fast linting & formatting**
- 2x faster than ESLint
- Replaces ESLint + Prettier
- Configuration: `biome.json`
- Command: `npm run lint` / `npm run lint:fix` / `npm run format`

### Husky 9.1.7

- **Git hooks automation**
- Pre-commit checks
- Prevents bad code from being committed

### lint-staged 17.0.4

- **Runs linters on staged files only**
- Fast pre-commit validation
- Targets: `*.ts` and `*.json` files

## Test Reporting Stack

### Allure 2.41.0

- Interactive HTML test reports
- Historical trend tracking
- Category and timeline views
- Commands:
  - `npm run report` — Generate report
  - `npm run report:open` — View in browser

## Version Summary

| Tool          | Version | Purpose       |
| ------------- | ------- | ------------- |
| TypeScript    | 6.0.3   | Type safety   |
| Node.js       | 16+     | Runtime       |
| Cypress       | 15.15.0 | UI automation |
| Biome         | 2.4.15  | Linting       |
| Anthropic SDK | 0.24.0  | LLM-as-judge  |
| Husky         | 9.1.7   | Git hooks     |
| Allure        | 2.41.0  | Reporting     |

## Why These Tools?

✅ **TypeScript** — Type safety catches errors early
✅ **Cypress** — Real browser testing, fast feedback
✅ **Biome** — Fastest linter/formatter available
✅ **Anthropic SDK** — State-of-the-art LLM for semantic evaluation
✅ **Allure** — Beautiful, interactive test reports
✅ **Gherkin** — Business-readable test scenarios

## Integration Points

```
package.json (npm scripts)
    ↓
[API Tests] ─→ ts-node → harness.ts → scorer.ts → Anthropic API
    ↓
[UI Tests]  ─→ Cypress → Step Definitions → ChatPage → Browser
    ↓
[Reporting] ─→ Allure   → HTML Reports
    ↓
[Code Quality] ─→ Biome  → Husky → lint-staged
```
