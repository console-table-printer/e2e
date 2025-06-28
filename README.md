# E2E Tests for console-table-printer and simple-wcswidth

![Daily Tests](https://github.com/console-table-printer/e2e/workflows/Daily%20Tests/badge.svg)
![Node.js 16 Tests](https://github.com/console-table-printer/e2e/workflows/Node.js%2016%20Tests/badge.svg)

This repository contains end-to-end tests for the [console-table-printer](https://github.com/ayonious/console-table-printer) and [simple-wcswidth](https://github.com/ayonious/simple-wcswidth) packages.

## Test Types

### Unit Tests (Jest)

- **console-table-printer**: Tests for basic and advanced table functionality
- **simple-wcswidth**: Tests for character width calculation with various character sets
- **Integration**: Tests that combine both libraries to ensure they work well together

### TypeScript Tests

- **TypeScript Import Tests**: Verify that both packages can be properly imported in TypeScript
- **Type Checking**: Ensure that exported types are correctly defined and usable
- **TypeScript Integration**: Test both libraries working together in a TypeScript environment

## Running Tests

```bash
# Install dependencies
yarn

# Run unit tests
yarn test
```

## Test Structure

```
tests/
├── console-table-printer/   # JavaScript unit tests for console-table-printer
│   ├── basic.test.js
│   └── advanced.test.js
├── simple-wcswidth/         # JavaScript unit tests for simple-wcswidth
│   ├── basic.test.js
│   └── advanced.test.js
├── integration/             # JavaScript integration tests
│   └── combined.test.js
├── typescript/              # TypeScript tests
│   ├── console-table-printer/
│   │   ├── basic.test.ts
│   │   └── advanced.test.ts
│   ├── simple-wcswidth/
│   │   ├── basic.test.ts
│   │   └── advanced.test.ts
│   └── integration/
│       └── combined.test.ts
└── website/                 # Website E2E tests with Playwright
    ├── homepage.test.js
    └── docs.test.js
```

## Automated Testing

This repository uses GitHub Actions to run tests automatically:

- Tests run daily at midnight UTC to ensure continuous compatibility
- Tests run on every push to the main branch
- Unit tests run on multiple Node.js versions:
  - Node.js 12.x (using Jest 27.x for compatibility)
  - Node.js 14.x (using Jest 29.x for compatibility)
  - Node.js 16.x (using Jest 29.x for compatibility)
  - Node.js 18.x, 20.x, 22.x, 24.x (using Jest 30.x)
- E2E tests run separately using Playwright
- Manual test runs can be triggered from the Actions tab in GitHub

Test results and artifacts are stored for 7 days and can be downloaded from the GitHub Actions workflow runs.
