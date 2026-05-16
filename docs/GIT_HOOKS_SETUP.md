# Git Hooks & Code Quality Setup ✅

## What Was Added

### 📦 Dependências Instaladas

```bash
npm install --save-dev husky lint-staged
```

- **Husky 9.1.7** — Git hooks manager
- **lint-staged 17.0.4** — Run linters on staged files only

---

## 🔧 Configuração Implementada

### 1. Pre-Commit Hook (`.husky/pre-commit`)

Runs automatically **before each commit**.

```bash
npx lint-staged
```

### 2. Lint-Staged Config (`package.json`)

```json
"lint-staged": {
  "*.ts": [
    "biome lint --fix",
    "biome format --write"
  ],
  "*.json": [
    "biome format --write"
  ]
}
```

**What happens at commit:**

1. ✅ Detects modified files (`.ts`, `.json`)
2. ✅ Runs Biome lint (auto-fix)
3. ✅ Runs Biome format
4. ✅ If OK → commit proceeds
5. ❌ If issues found → commit blocked, you review

### 3. Prepare Script (`package.json`)

```json
"prepare": "husky install"
```

**When it runs:** Automatically after `npm install`  
**What it does:** Activates git hooks

---

## 🚀 How to Use

### First clone/setup

```bash
npm install
# prepare script rodou automaticamente
# Husky está ativo
```

### Normal Development

```bash
# Edite arquivos
vim tests/harness/scorer.ts
vim tests/harness/test-cases.json

# Faça commit normalmente
git add .
git commit -m "Fix: update scorer rules"

# ⚡ Pre-commit hook runs automatically
# ✅ Biome lint + format executed
# ✅ If OK: commit accepted
# ❌ If issues: auto-fix applied, you re-stage
```

### If you need to review what will be checked

```bash
# See what lint-staged will do (without running)
npx lint-staged --dry-run
```

### To force commit (⚠️ not recommended)

```bash
git commit --no-verify
```

---

## 📊 Workflow Visual

```
git commit -m "..."
       ↓
   Husky Hook Triggered
       ↓
   lint-staged Runs
       ↓
   ┌─────────────────────┐
   │ Biome Actions:      │
   │ • lint --fix        │
   │ • format --write    │
   └─────────────────────┘
       ↓
   ┌──────────────────┐
   │  Issues Found?   │
   └──────────────────┘
      ✅ NO           ❌ YES
      ↓                ↓
   Commit OK     Auto-fix Applied
      ↓                ↓
   SUCCESS      Commit Blocked
               (Review & Re-stage)
```

---

## 📁 Added/Modified Files

```
meridian-banking-chatbot-harness/
├── .husky/
│   ├── pre-commit          [NEW] ← Git hook script
│   ├── README.md           [NEW] ← Hook documentation
│   └── _/                  [NEW] ← Husky internals
│
├── package.json            [MODIFIED]
│   └── "prepare": "husky install"
│   └── "lint-staged": {...}
│   └── husky dependency added
│   └── lint-staged dependency added
│
└── (rest of project unchanged)
```

---

## ✅ Verification

```bash
# See all installed git hooks
ls -la .husky/

# Test the hook (without committing)
npx lint-staged --dry-run

# See lint-staged configuration
cat package.json | grep -A 10 "lint-staged"
```

---

## 💡 Benefícios

| Benefit                   | How it works                               |
| ------------------------- | ------------------------------------------ |
| **No bad code committed** | Pre-commit hook blocks commits with issues |
| **Fast**                  | lint-staged runs ONLY on modified files    |
| **Auto-fix**              | Biome fixes issues automatically           |
| **Visibility**            | You see exactly what was changed           |
| **Team-safe**             | Ensures code consistency across the team   |

---

## 🎯 Next Steps (Optional)

Se quiser adicionar mais hooks no futuro:

```bash
# Add hook for PR commits (lint commit messages)
npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
```

---

**Status:** ✅ Git Hooks Configured and Active  
**Next action:** Make a normal commit and see the hook in action!
