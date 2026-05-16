# Common Commands

## API Tests

```bash
npm run harness              # All 14 API tests
npm run harness:verbose      # With detailed output
npm run harness:account      # Filter by category
npm run harness:security
npm run harness:transfer
```

## UI Tests

```bash
npm run cypress:open         # Interactive runner
npm run cypress:run          # Headless
npm run cypress:account      # Specific suite
npm run cypress:security
npm run cypress:transfer
npm run cypress:performance
npm run cypress:conversational
npm run cypress:functional
```

## Reports & Visualization

```bash
npm run convert:allure       # Convert test results to Allure format
npm run report               # Generate interactive Allure HTML report
npm run report:open          # Open report in browser
npm run report:clean         # Delete old reports
npm run ci:test              # Run tests + generate report (one command)
```

## Both (API + UI)

```bash
npm run test                 # Run all tests (API + UI)
```

## Code Quality

```bash
npm run lint                 # Check with Biome
npm run lint:fix             # Auto-fix issues
npm run format               # Format all files
npm run docs:scenarios       # Generate SCENARIOS.md inventory
```

## Detailed Filtering

Filter API tests by category:

```bash
npm run harness:account      # ACCOUNT_* tests
npm run harness:security     # SECURITY_* tests
npm run harness:transfer     # TRANSFER_* tests
```

Filter BDD tests by feature:

```bash
npm run cypress:conversational
npm run cypress:functional
npm run cypress:security
npm run cypress:performance
npm run cypress:compatibility
npm run cypress:context
npm run cypress:fallback
npm run cypress:moderation
npm run cypress:prompts
npm run cypress:regression
npm run cypress:ui
npm run cypress:e2e
```
