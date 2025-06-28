# E2E Tests for console-table-printer and simple-wcswidth

![Hourly Tests](https://github.com/console-table-printer/e2e/workflows/Hourly%20Tests/badge.svg)

This repository contains end-to-end tests for the [console-table-printer](https://github.com/ayonious/console-table-printer) and [simple-wcswidth](https://github.com/ayonious/simple-wcswidth) packages.

## Test Types

### Unit Tests (Jest)

- **console-table-printer**: Tests for basic and advanced table functionality
- **simple-wcswidth**: Tests for character width calculation with various character sets
- **Integration**: Tests that combine both libraries to ensure they work well together

### Website Tests (Playwright)

- Tests for the [console-table-printer website](https://console-table.netlify.app/)
- Verifies homepage content, navigation, and documentation pages

## Running Tests

```bash
# Install dependencies
yarn

# Run unit tests
yarn test:unit

# Run website E2E tests
yarn test:e2e

# Run all tests
yarn test:all
```

## Test Structure

```
tests/
├── console-table-printer/   # Unit tests for console-table-printer
│   ├── basic.test.js
│   └── advanced.test.js
├── simple-wcswidth/         # Unit tests for simple-wcswidth
│   ├── basic.test.js
│   └── advanced.test.js
├── integration/             # Integration tests combining both libraries
│   └── combined.test.js
└── website/                 # Website E2E tests with Playwright
    ├── homepage.test.js
    └── docs.test.js
```

## Automated Testing

This repository uses GitHub Actions to run tests automatically:

- Tests run hourly to ensure continuous compatibility
- Tests run on every push to the main branch
- Unit tests run on multiple Node.js versions (16.x, 18.x, 20.x)
- E2E tests run after unit tests pass
- Manual test runs can be triggered from the Actions tab in GitHub

Test results and artifacts are stored for 7 days and can be downloaded from the GitHub Actions workflow runs.
