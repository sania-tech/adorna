const { TextEncoder } = require('util');

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: "node",
  globals: {
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder,
  },
  transformIgnorePatterns: ['/node_modules/(?!some-esm-package)'],
  extensionsToTreatAsEsm: ['.jsx', '.js'],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'], // Correctly points to jest.setup.js
  moduleNameMapper: {
    '\\.(png|jpe?g|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
// Ensure TextEncoder and TextDecoder are polyfilled if they are not present
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

