/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  // Co-located tests: *.test.ts(x) / *.spec.ts(x) next to source files.
  testMatch: ['<rootDir>/src/**/*.{test,spec}.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Map CSS imports to a no-op so component imports don't break.
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/styleMock.cjs'
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  }
};
