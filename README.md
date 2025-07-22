# E2E Tests for console-table-printer and simple-wcswidth

![Daily Tests](https://github.com/console-table-printer/e2e/workflows/Daily%20Tests/badge.svg)
![Node.js 12 Tests](https://github.com/console-table-printer/e2e/workflows/Node.js%2012%20Tests/badge.svg)
![Node.js 14 Tests](https://github.com/console-table-printer/e2e/workflows/Node.js%2014%20Tests/badge.svg)
![Node.js 16 Tests](https://github.com/console-table-printer/e2e/workflows/Node.js%2016%20Tests/badge.svg)
![Update Dependencies](https://github.com/console-table-printer/e2e/workflows/Update%20Dependencies/badge.svg)

This repository contains end-to-end tests for the [console-table-printer](https://github.com/ayonious/console-table-printer) and [simple-wcswidth](https://github.com/ayonious/simple-wcswidth) packages.

## Test Types

### JavaScript Tests (Jest)

- **console-table-printer**: Tests for basic and advanced table functionality
- **simple-wcswidth**: Tests for character width calculation with various character sets
- **Types**: Tests for proper exports and type definitions

### TypeScript Tests

- **TypeScript Import Tests**: Verify that both packages can be properly imported in TypeScript
- **Type Checking**: Ensure that exported types are correctly defined and usable

## Running Tests

```bash
# Install dependencies
yarn

# Run all tests
yarn test
```

## Test Structure

```
tests/
├── console-table-printer/   # Tests for console-table-printer
│   ├── basic.test.js        # JavaScript basic tests
│   ├── advanced.test.js     # JavaScript advanced tests
│   ├── types.test.js        # JavaScript type exports tests
│   ├── basic.test.ts        # TypeScript basic tests
│   ├── advanced.test.ts     # TypeScript advanced tests
│   └── types.test.ts        # TypeScript type definitions tests
└── simple-wcswidth/         # Tests for simple-wcswidth
    ├── basic.test.js        # JavaScript basic tests
    ├── advanced.test.js     # JavaScript advanced tests
    ├── types.test.js        # JavaScript type exports tests
    ├── basic.test.ts        # TypeScript basic tests
    ├── advanced.test.ts     # TypeScript advanced tests
    └── types.test.ts        # TypeScript type definitions tests
```

## Automated Testing

This repository uses GitHub Actions to run tests automatically:

- Tests run daily via the daily-tests workflow
- Tests run on multiple Node.js versions:
  - Node.js 12.x (via node12-tests workflow)
  - Node.js 14.x (via node14-tests workflow)
  - Node.js 16.x (via node16-tests workflow)
- Dependencies are automatically updated via the update-dependencies workflow

### Node.js Compatibility

- The test suite is compatible with Node.js versions 12, 14, and 16
- For newer Node.js versions (18+), all tests should run without issues
- Note: Some testing tools may have specific Node.js version requirements
