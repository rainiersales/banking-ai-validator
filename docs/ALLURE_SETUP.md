# 📊 Test Reporting with Allure & GitHub Pages

This project uses **Allure Report** for beautiful, interactive test reporting and **GitHub Pages** for hosting historical test reports.

## 🚀 Quick Start

### Local Usage

**Generate report locally:**

```bash
npm run report
```

**View report in browser:**

```bash
npm run report:open
```

**Clean old reports:**

```bash
npm run report:clean
```

### One-Command Test & Report

```bash
npm run ci:test
```

This runs tests and generates the Allure report in one command.

---

## 📈 What You Get

### Local Report (`allure-report/`)

- ✅ Beautiful HTML dashboard
- ✅ Test results breakdown by category
- ✅ Pass/fail statistics
- ✅ Test duration metrics
- ✅ Failure details and traces
- ✅ Search functionality

### GitHub Pages Report

- ✅ Historical reports (one per run)
- ✅ Trend analysis
- ✅ Team-accessible via URL
- ✅ Automatic updates on each push

---

## 🔧 GitHub Setup

### 1. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
   - Save

### 2. Verify GitHub Actions

The workflow file (`.github/workflows/test-and-report.yml`) is already configured to:

- ✅ Run tests on push to `main` / `develop`
- ✅ Generate Allure reports
- ✅ Deploy to GitHub Pages automatically
- ✅ Comment on PRs with report link

### 3. (Optional) Add Secrets

For custom environment variables:

```bash
Settings → Secrets and variables → Actions
```

Add:

- `BASE_URL` - API endpoint
- `CHATBOT_TOKEN` - Auth token
- `CHATBOT_SESSION_ID` - Session ID

---

## 📊 Report Structure

### Home Page

- **Summary**: Pass rate, average score, total tests
- **Categories**: Results grouped by test type
- **Timeline**: Test execution timeline

### Test Details

- Test name & ID
- Pass/fail status
- Score breakdown
- Raw response & error messages
- Execution timestamp

### History

- Previous runs
- Trends over time
- Success rate evolution

---

## 🔗 Access Your Report

### Local

```
file:///path/to/qa-chatbot-harness/allure-report/index.html
```

### GitHub Pages

```
https://<your-username>.github.io/<repo-name>/reports/<run-number>/
```

**Example:**

```
https://username.github.io/qa-chatbot-harness/reports/42/
```

---

## 🔄 How It Works

### Local Flow

```
npm run harness
    ↓
JSON report generated (test-results/)
    ↓
npm run convert:allure
    ↓
Allure format files (allure-results/)
    ↓
allure generate
    ↓
HTML report (allure-report/)
```

### GitHub Actions Flow

```
Push to main/develop
    ↓
GitHub Actions triggers
    ↓
npm ci → npm run harness → npm run report
    ↓
Generate Allure report
    ↓
Upload to GitHub Pages
    ↓
Available at: github.io/<repo>/reports/<run-number>/
```

---

## 📝 Customization

### Update Report Categories

Edit `.github/workflows/test-and-report.yml` to customize categories, or modify `allure.config.js`.

### Change Report Retention

In `.github/workflows/test-and-report.yml`:

```yaml
retention-days: 90 # Change this value
```

### Modify Conversion Logic

Edit `scripts/convert-to-allure.ts` to customize how test results are converted to Allure format.

---

## 📚 Useful Commands

| Command                | Purpose                     |
| ---------------------- | --------------------------- |
| `npm run harness`      | Run tests only              |
| `npm run report`       | Generate Allure report      |
| `npm run report:open`  | Open report in browser      |
| `npm run ci:test`      | Test + report (one command) |
| `npm run report:clean` | Delete all reports          |

---

## 🐛 Troubleshooting

### Report not generating?

1. Check test results exist:

   ```bash
   ls tests/harness/test-results/
   ```

2. Run conversion manually:

   ```bash
   npm run convert:allure
   ```

3. Check for errors:
   ```bash
   npm run report 2>&1
   ```

### GitHub Pages not deploying?

1. Verify GitHub Pages enabled in Settings
2. Check workflow run in **Actions** tab
3. Wait ~2-5 minutes for deployment

### Report not accessible?

- Check repo is public (or you have access)
- Use full URL: `https://username.github.io/repo-name/reports/123/`
- Wait for GitHub Pages to rebuild

---

## 📖 Documentation

- **Allure Report**: https://docs.qameta.io/allure/
- **GitHub Pages**: https://docs.github.com/en/pages
- **GitHub Actions**: https://docs.github.com/en/actions

---

## 🎯 Next Steps

1. ✅ Run `npm run ci:test` locally to verify
2. ✅ Push to `main` branch
3. ✅ Check **Actions** tab for workflow run
4. ✅ Visit GitHub Pages URL to view report
5. ✅ Share report link with team
