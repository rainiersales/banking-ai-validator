# Project Structure

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
│   ├── README.md               # Main project overview
│   ├── GETTING_STARTED.md      # Installation & quick start
│   ├── WHATS_INCLUDED.md       # Test frameworks overview
│   ├── APPROACH_NOTE.md        # Testing philosophy
│   ├── STRATEGY_NOTE.md        # Scaling roadmap
│   ├── HYBRID_TESTING.md       # Hybrid approach explained
│   ├── AI_TOOL_LOG.md          # AI tools used
│   └── REQUIREMENTS_CHECKLIST.md # Compliance audit
│
└── ⚙️ Configuration
    ├── package.json
    ├── tsconfig.json
    ├── cypress.config.js
    ├── biome.json
    └── .husky/                 # Git hooks
```
