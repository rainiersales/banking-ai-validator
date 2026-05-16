# Getting Started

## Prerequisites

- Node.js 16+
- npm or yarn
- `.env` file with credentials (see Configuration section)

## Installation (2 min)

```bash
# Clone the repository (if not already done)
git clone <repo-url>
cd qa-chatbot-harness

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# - BASE_URL: API endpoint
# - CHATBOT_TOKEN: Session token
# - CHATBOT_SESSION_ID: Session ID
# - ANTHROPIC_API_KEY: Claude API key for LLM-as-judge
```

## First Test Run (5 min)

### Run API Tests Only

```bash
npm run harness              # All 14 API tests (~2 min)
npm run harness:account      # Just account tests
npm run harness:verbose      # With detailed output
```

### Run UI Tests Only

```bash
npm run cypress:open         # Interactive test runner (development)
npm run cypress:run          # Headless execution (~5-10 min)
npm run cypress:account      # Run specific suite
```

### Run All Tests

```bash
npm run test                 # Both API + UI tests
```

## View Results

### Local HTML Reports

```bash
npm run report               # Generate Allure HTML report
npm run report:open          # Open in browser
```

### JSON Results

Raw results are in:

```
tests/harness/test-results/report-*.json
```

## Next Steps

| What                             | Command                                            |
| -------------------------------- | -------------------------------------------------- |
| **See all commands**             | `npm run` (lists all scripts)                      |
| **Read test philosophy**         | See [APPROACH_NOTE.md](./APPROACH_NOTE.md)         |
| **Understand project structure** | See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) |
| **Learn UI architecture**        | See [UI_ARCHITECTURE.md](./UI_ARCHITECTURE.md)     |
| **Configure CI/CD**              | See [CONFIGURATION.md](./CONFIGURATION.md)         |

## Troubleshooting

| Problem                              | Solution                                                 |
| ------------------------------------ | -------------------------------------------------------- |
| **Tests fail with 401 Unauthorized** | Check `CHATBOT_TOKEN` and `CHATBOT_SESSION_ID` in `.env` |
| **"Cannot find module" errors**      | Run `npm install` again; check Node.js version (16+)     |
| **Cypress can't connect**            | Check `BASE_URL` in `.env`; verify network connectivity  |
| **Tests timeout**                    | Increase `REQUEST_TIMEOUT` in `.env` (default 10000ms)   |
| **LLM scoring fails**                | Check `ANTHROPIC_API_KEY` is valid and has quota         |
| **Port 3000 already in use**         | Kill process or change `cypress.config.js` port          |
| **Git hooks fail on commit**         | Run `npx husky install` to reinstall pre-commit hooks    |

## Common Issues

### Issue: "ENOENT: no such file or directory, open '.env'"

**Solution:**

```bash
cp .env.example .env
# Then edit .env with your values
```

### Issue: Cypress tests are too slow

**Solution:** UI tests are slower by design. For quick feedback, use API tests:

```bash
npm run harness            # Fast (~2 min)
npm run cypress:open       # Slower but visual (~10 min)
```

### Issue: Tests pass locally but fail in CI

**Solution:** Make sure CI/CD has all environment variables set:

- In GitHub Actions, add secrets to repo settings
- See [CONFIGURATION.md](./CONFIGURATION.md) for setup

## What to Do Next

1. ✅ Run `npm run harness` to verify setup works
2. ✅ Check report: `npm run report:open`
3. ✅ Read [APPROACH_NOTE.md](./APPROACH_NOTE.md) to understand philosophy
4. ✅ Explore [SCENARIOS.md](../SCENARIOS.md) to see all tests
5. ✅ Set up [git hooks](./GIT_HOOKS_SETUP.md) for clean commits

**Questions?** See [COMMON_COMMANDS.md](./COMMON_COMMANDS.md) or check the docs index in [README.md](../README.md).
