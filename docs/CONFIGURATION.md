# Configuration

## Environment Variables

Create `.env` file in project root:

```env
# Chatbot API
BASE_URL=https://2ndround.sandb0x.run
CHATBOT_TOKEN=kwpw-fees-19bg-fm6z-svqr-d29p8n
CHATBOT_SESSION_ID=5e0ec23e76d719aa

# AI/ML
ANTHROPIC_API_KEY=sk-ant-...  # For LLM-as-judge scoring

# Timeouts
REQUEST_TIMEOUT=10000         # 10 seconds
CYPRESS_TIMEOUT=10000         # 10 seconds

# Logging
VERBOSE=false
LOG_LEVEL=info
```

## File-based Configuration

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["tests/**/*.ts", "cypress/**/*.ts", "scripts/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Cypress Configuration (cypress.config.js)

```javascript
module.exports = {
  e2e: {
    baseUrl: "https://2ndround.sandb0x.run",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    specPattern: "cypress/e2e/**/*.cy.ts",
  },
  component: {
    devServer: {
      framework: "cypress",
      bundler: "webpack",
    },
  },
};
```

### Biome Configuration (biome.json)

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

### Allure Configuration (allure.config.js)

```javascript
module.exports = {
  resultsDir: "tests/harness/allure-results",
  reportDir: "allure-report",
  history: ["tests/harness/allure-results/history.json"],
};
```

## Timeout Configuration

### Request Timeouts

- **API requests** — 10 seconds
- **Cypress commands** — 10 seconds
- **Cypress waits** — 10 seconds
- **LLM API calls** — 30 seconds

### Test Execution Timeouts

| Test Suite                | Duration      |
| ------------------------- | ------------- |
| API Tests (14 cases)      | ~2 minutes    |
| BDD Active (57 scenarios) | ~5-10 minutes |
| Full Suite                | ~15 minutes   |

## Git Hooks Configuration

Husky automatically runs pre-commit checks via `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
npx tsx scripts/generate-scenarios.ts
```

This ensures:

1. **Code quality** — Biome lints & formats
2. **Scenarios updated** — SCENARIOS.md regenerated
3. **Clean commits** — Only properly formatted code

## Database/Session Configuration

### Chatbot Session

- **Base URL** — REST API endpoint
- **Token** — Session authentication
- **Session ID** — Persistent chat context

### Test Data

- **Account Balance** — Fixed ($1,234.56)
- **Customer Name** — Consistent (Test User)
- **Transaction History** — Pre-defined scenarios

## Performance Tuning

### For Faster Tests

```bash
# Run tests in parallel (Cypress)
npm run cypress:run -- --parallel

# Filter specific tests
npm run harness:account    # Only ACCOUNT_* tests
```

### For More Verbose Output

```bash
# API tests with details
npm run harness:verbose

# Cypress with debug logging
npx cypress run --env log_level=debug
```

## Security Notes

⚠️ **Never commit `.env` to version control**

- `.env` is in `.gitignore`
- API keys must be set locally or via CI/CD secrets
- For GitHub Actions, use repository secrets

### Credentials Management

```bash
# Local development
cp .env.example .env
# Edit .env with your credentials

# GitHub Actions
# Set secrets in: Settings → Secrets and variables → Actions
```

## Troubleshooting Configuration

| Issue                       | Solution                           |
| --------------------------- | ---------------------------------- |
| Tests fail with 401         | Check CHATBOT_TOKEN in .env        |
| Tests timeout               | Increase REQUEST_TIMEOUT in .env   |
| LLM scoring fails           | Verify ANTHROPIC_API_KEY is valid  |
| Cypress can't find elements | Check BASE_URL and CYPRESS_TIMEOUT |

---

## Advanced Setup: Allure Reporting

### Quick Start

```bash
npm run report               # Generate Allure HTML report
npm run report:open          # Open in browser
npm run report:clean         # Delete old reports
```

### Local Report

Report is generated in `allure-report/` with:

- ✅ Test results dashboard
- ✅ Pass/fail breakdown by category
- ✅ Execution timeline
- ✅ Detailed failure analysis
- ✅ Historical trend tracking

### GitHub Pages Setup

Enable GitHub Pages in repository settings:

1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions** (pre-configured)
3. Reports automatically deploy on each push

**Access:** `https://<your-username>.github.io/<repo-name>/reports/<run-number>/`

### One-Command Test & Report

```bash
npm run ci:test              # Runs tests + generates Allure report
```

---

## Advanced Setup: Git Hooks (Code Quality)

### What's Included

Pre-commit hooks via Husky automatically:

1. **Lint & format** code with Biome
2. **Regenerate** SCENARIOS.md
3. **Block commits** if issues found

### Activation

```bash
npm install                  # Automatically activates (runs "prepare" script)
```

### How It Works

```bash
git add .
git commit -m "Update tests"
    ↓
Husky hook triggered
    ↓
Biome lint --fix
Biome format --write
    ↓
OK? → commit accepted
NOT OK? → auto-fix applied, re-stage and retry
```

### Manual Trigger

```bash
# See what lint-staged will check (dry-run)
npx lint-staged --dry-run

# Force commit without checks (⚠️ not recommended)
git commit --no-verify
```

### Reinstall Hooks

```bash
npx husky install           # If hooks were deleted
```

---

## CI/CD Configuration

### GitHub Actions

Automated testing pipeline (`.github/workflows/test-and-report.yml`):

1. Runs all API tests
2. Generates Allure reports
3. Publishes to GitHub Pages
4. Comments on PRs with report links

### Required Secrets

Add to **Settings → Secrets and variables → Actions**:

```
BASE_URL = https://2ndround.sandb0x.run
CHATBOT_TOKEN = <your-token>
CHATBOT_SESSION_ID = <your-session-id>
ANTHROPIC_API_KEY = sk-ant-...
```

### Trigger Tests

```bash
# Automatically runs on:
# - Push to main/develop
# - Pull requests
# - Manual workflow dispatch (GitHub UI)
```

| Git hooks not running | Run `npm run prepare` to install Husky |
