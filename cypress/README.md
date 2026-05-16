# Cypress E2E Tests — Meridian Banking Chatbot

UI automation tests for the Meridian Banking chatbot interface. Tests real user interactions with the browser.

---

## Quick Start

### Install Dependencies

```bash
npm install
```

### Open Cypress UI

```bash
npm run cypress:open
```

### Run Headless

```bash
npm run cypress:run
```

### Run Specific Tests

```bash
npm run cypress:account       # Account tests
npm run cypress:security      # Security tests
npm run cypress:transfer      # Transfer tests
npm run cypress:performance   # Performance & conversational tests
```

---

## Test Files

| File                  | Purpose              | Tests        |
| --------------------- | -------------------- | ------------ |
| **account.cy.ts**     | Account data queries | 5 scenarios  |
| **security.cy.ts**    | Security guardrails  | 4 scenarios  |
| **transfer.cy.ts**    | Transfer flows       | 3 scenarios  |
| **performance.cy.ts** | Performance & UX     | 4+ scenarios |

---

## Custom Commands

### cy.loginMeridian()

Login to Meridian with session token.

```typescript
cy.loginMeridian();
```

### cy.sendChatMessage(message)

Type and send message.

```typescript
cy.sendChatMessage("What is my balance?");
```

### cy.getLastBotMessage()

Get latest bot response.

```typescript
cy.getLastBotMessage().should("contain.text", "€");
```

### cy.verifyBotResponse(text)

Verify response contains text.

```typescript
cy.verifyBotResponse("€2,668.83");
```

### cy.sendMessageViaAPI(message)

Send message via API (not UI).

```typescript
cy.sendMessageViaAPI("What is my balance?").then((response) => {
  expect(response.status).to.equal(200);
});
```

---

## Configuration

**cypress.config.js:**

- Base URL: https://2ndround.sandb0x.run
- Viewport: 1280x720
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
