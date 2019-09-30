module.exports = {
  verbose: true,
  notify: true,
  bail: true,
  automock: false,
  rootDir: "../../",
  setupFiles: ["<rootDir>/__test__/jest/.jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(css|less)$": "<rootDir>/__test__/jest/__mocks__/styleMock.js"
  },
  moduleNameMapper: {
    "\\.s?css$": "<rootDir>/__test__/jest/__mocks__/styleMock.js"
  },
  testMatch: ["<rootDir>/__test__/jest/**/*.test.{js,jsx}"],
  collectCoverageFrom: [
    "<rootDir>/src/frontend/**/*.{js,jsx}"
  ],
  coverageDirectory: "<rootDir>/__test__/jest/coverage/",
  coveragePathIgnorePatterns: [
    './core/stores/configureStore.js',
    './core/middleware/logger.js',
    './core/middleware/logger.js',
  ]
};
