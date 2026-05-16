# Husky Git Hooks

This directory contains Git hooks managed by Husky.

## pre-commit

Runs `lint-staged` before every commit to ensure code quality.

**What it does:**

- Runs Biome linter on modified `.ts` files
- Auto-fixes linting issues
- Formats modified `.json` files

**How it works:**

```bash
git add .
git commit -m "..."  # <- pre-commit hook runs here
```

If Biome finds issues:

1. Auto-fixes are applied
2. Commit is blocked
3. You must review changes and re-stage them

**To bypass** (not recommended):

```bash
git commit --no-verify
```

---

**Setup:** Husky is initialized automatically when you run `npm install`
