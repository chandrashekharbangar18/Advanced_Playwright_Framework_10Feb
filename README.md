# Advanced Playwright Framework

A TypeScript-based Playwright test framework with browser and API test projects, environment-aware configuration, custom reporting, and CI execution. The framework is organized to keep tests, page objects, fixtures, test data, API helpers, and shared utilities separate as the project grows.

## Requirements

- Node.js (an active LTS release is recommended)
- npm
- Playwright-supported browsers (install with `npx playwright install`)

## Setup

```bash
npm ci
npx playwright install
```

Copy the environment variables appropriate for your target environment into a local `.env` file. Do not commit `.env` or credentials. The Playwright config supports `BASE_URL`, `TTA_ENV`, and environment-specific URLs: `API_BASE_URL`, `DEV_BASE_URL`, `STG_BASE_URL`, `PROD_BASE_URL`, and `QA_BASE_URL`.

`TTA_ENV` selects the default base URL (`qa` when unset). Supported values include `api`, `dev`/`local`, `stg`/`stage`/`staging`, and `prod`/`production`. `BASE_URL`, when set, takes precedence.

## Run tests

```bash
npm test                  # Run the full Playwright suite
npm run test:ui            # Open Playwright UI mode
npm run test:chromium      # Run the Chromium project
npm run test:firefox       # Run the Firefox project
npm run test:debug         # Run tests in Playwright debug mode
npm run test:report        # Open the HTML report
npm run test:p0            # Run tests tagged @P0
npm run test:p1            # Run tests tagged @p1
npm run typecheck          # Type-check the TypeScript project
npm run lint               # Lint TypeScript files
```

The active browser project is Chromium; the API project discovers tests under `src/tests/apiTests`. Firefox, WebKit, and mobile projects are currently examples commented out in `playwright.config.ts`. Test runs produce HTML, JSON, and Allure results in their respective report folders.

## Repository structure

```text
.
├── .github/
│   └── workflows/
│       ├── copilot-instructions.md
│       └── playwright.yml
├── AGENTS.md
├── CLAUDE.md
├── Dockerfile
├── docs/
│   └── phase1/
│       └── prompts.md
├── rules/
│   └── test-quality-checks.md
├── src/
│   ├── api/                  # API clients and helpers (extension point)
│   ├── config/               # Framework and environment configuration
│   ├── fixtures/             # Shared Playwright fixtures
│   ├── pages/                # Page object models
│   ├── testdata/             # Test data and data providers
│   ├── tests/
│   │   └── example.spec.ts
│   └── utils/
│       ├── CustomReporter.ts
│       └── logger.ts
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

The API, config, fixtures, pages, and testdata folders are framework extension points and are currently empty. Add related code to these locations rather than placing framework-wide helpers directly in test files.

## Reports and CI

Playwright is configured to save screenshots on failure, videos on failure, and traces on the first retry. The GitHub Actions workflow installs dependencies and browsers, runs the suite, and uploads the HTML report artifact.

Test runs generate HTML, JSON, Allure, and custom TTA reports in `playwright-report/`, `test-results/`, `allure-results/`, and `tta-report/`. These generated reports and results are ignored by Git and should not be committed.

See [Phase 1 prompts](./docs/phase1/prompts.md) for the conversation prompt captured for this framework and a reusable student prompt.
