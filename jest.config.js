const { TextEncoder, TextDecoder } = require('util');

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: "jsdom", // Ensure this is set to 'jsdom' for browser-like environment
  globals: {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  },
  transformIgnorePatterns: ['/node_modules/(?!some-esm-package)'],
  extensionsToTreatAsEsm: ['.jsx', '.js'],
  setupFiles: ['<rootDir>/jest.setup.js'], // Correctly points to jest.setup.js
  moduleNameMapper: {
    '\\.(png|jpe?g|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

// Ensure TextEncoder and TextDecoder are polyfilled if they are not present
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
