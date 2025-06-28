module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/website/'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}; 