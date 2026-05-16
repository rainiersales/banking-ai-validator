# Cypress E2E Tests

UI automation tests for the Meridian Banking chatbot interface.

## Quick Start

```bash
npm install
npm run cypress:open
```

For all commands, see [COMMON_COMMANDS.md](../docs/COMMON_COMMANDS.md).

## Directory Structure

```
cypress/
├── e2e/                  # Feature files (Gherkin/BDD)
│   ├── account/
│   ├── security/
│   ├── transfer/
│   └── ...
│
├── support/
│   ├── step_definitions/ # Gherkin step implementations
│   ├── pages/            # Page Object Model (ChatPage)
│   ├── factories/        # Test data factories
│   ├── commands.ts       # Custom Cypress commands
│   └── e2e.ts           # Setup/hooks
│
└── screenshots/ & videos/ # Test artifacts
```

## Custom Commands

All custom commands are in `support/commands.ts` and documented in [UI_ARCHITECTURE.md](../docs/UI_ARCHITECTURE.md):

- `cy.loginMeridian()` — Login with session token
- `cy.sendChatMessage(text)` — Send message to bot
- `cy.getLastBotMessage()` — Get latest bot response
- `cy.verifyBotResponse(text)` — Verify response content
- `cy.sendMessageViaAPI(message)` — Send via API

## Configuration

Base URL: https://2ndround.sandb0x.run  
Viewport: 1280x720  
See `cypress.config.js` for full config.

- Timeout: 10 seconds
- Videos: Enabled (on failure)
- Screenshots: Enabled (on failure)

---

## Environment Variables

Create `.env` with:

```
CHATBOT_TOKEN=kwpw-fees-19bg-fm6z-svqr-d29p8n
```

---

## Output

### Screenshots (on failure)

```
cypress/screenshots/[test-name]/[failure].png
```

### Videos (on failure)

```
cypress/videos/[test-name].mp4
```

---

## Best Practices

1. **Use custom commands** — Makes tests readable
2. **Wait for elements** — Always use `{ timeout: 10000 }`
3. **Test user actions** — Don't test implementation details
4. **Clear test names** — Describe what the user does

---

## Troubleshooting

**Tests fail to start?**

- Ensure CHATBOT_TOKEN is set in .env
- Check BASE_URL is accessible

**Timeout errors?**

- Increase timeout in cypress.config.js
- Check network latency

**Element not found?**

- Verify data-testid attributes in HTML
- Use cy.debug() to inspect state

---

**Status:** ✅ Ready | **Last Updated:** May 16, 2026
