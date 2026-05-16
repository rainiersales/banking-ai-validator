# UI Testing Architecture

## Page Object Model (POM)

The `ChatPage` class encapsulates all DOM interactions, providing a clean separation between test logic and UI details.

### Core Methods

```typescript
// Navigation
ChatPage.open(); // Navigate to chatbot
ChatPage.dismissModal(); // Close modal dialogs
ChatPage.openAssistant(); // Open chat interface

// Interaction
ChatPage.chat(message); // Send message to bot
ChatPage.getLastBotMessage(); // Retrieve latest response
ChatPage.clearChat(); // Clear conversation history

// Validation
ChatPage.isConnected(); // Check session state
ChatPage.waitForResponse(timeout); // Wait for bot reply
```

### Benefits

- ✅ Tests stay **readable** — No CSS selectors in test code
- ✅ Easy **maintenance** — Update selectors in one place
- ✅ **Reusability** — Same methods across all tests
- ✅ **Consistency** — Standard interaction patterns

## Gherkin Step Definitions

Reusable, composable steps for readable BDD scenarios:

### Step Types

```gherkin
# Setup
Given('I am logged into the Meridian chatbot')
Given('I have a chat session with 5 previous messages')

# Actions
When('I ask "<question>"')
When('I send the message "<text>"')
When('I wait for "<seconds>" seconds')

# Assertions
Then('the bot responds with my balance')
Then('the response contains "<keyword>"')
Then('the response matches "<pattern>"')
Then('the response time is under "<milliseconds>" ms')
And('the response is in "<language>"')
```

### Implementation

All steps implemented in `cypress/support/step_definitions/chatbot.steps.ts`

**Statistics:**

- ~450+ lines of code
- 50+ step definitions
- Covers 73 BDD scenarios

## Message Factory

Test data repository with categorized message variants:

### Categories

```typescript
MessageFactory.account.*                  // Account inquiry messages
  - getBalance()
  - getTransactionHistory()
  - getAccountDetails()

MessageFactory.transfer.*                 // Transfer flow messages
  - initiateTransfer()
  - confirmTransfer()
  - viewTransferStatus()

MessageFactory.security.*                 // Security testing
  - sqlInjection[]              // SQL injection probes
  - promptInjection[]           // Prompt injection attempts
  - xssPayloads[]               // XSS attack patterns

MessageFactory.conversational.*           // Natural conversation
  - greetings[]
  - questions[]
  - followUps[]
```

### Benefits

- ✅ **Centralized test data** — Single source of truth
- ✅ **Easy to expand** — Add variants without modifying tests
- ✅ **Consistent payloads** — Same data across all scenarios
- ✅ **Security focused** — Comprehensive attack vector library

## Test Flow Example

```
Feature: Account Balance Query

Scenario: Get current account balance
  Given I am logged into the Meridian chatbot
  When I ask "What is my account balance?"
  Then the bot responds with my balance
  And the response contains "$"
  And the response time is under "3000" ms
```

### Execution Steps

1. **Setup** (Given)
   - Authenticate user
   - Establish chat session
   - Initialize context

2. **Action** (When)
   - Send message via ChatPage.chat()
   - Wait for response via ChatPage.waitForResponse()

3. **Validation** (Then)
   - Assert response content
   - Verify response format
   - Check performance metrics

## Architecture Diagram

```
BDD Scenario (Feature File)
        ↓
Step Definition (chatbot.steps.ts)
        ↓
ChatPage (Page Object Model)
        ↓
Cypress Commands & DOM Interactions
        ↓
Chatbot UI (Real Browser)
```

## Best Practices

1. **Test Readability** — Write scenarios non-technical stakeholders can understand
2. **Reusable Steps** — Keep steps generic and composable
3. **Data Isolation** — Use MessageFactory for all test inputs
4. **POM Consistency** — All interactions go through ChatPage
5. **Explicit Waits** — Never rely on fixed timeouts
6. **Clear Assertions** — Make expectations explicit
