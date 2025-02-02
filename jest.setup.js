import { TextEncoder, TextDecoder } from 'util';
// jest.setup.js
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;



// Mock react-router-dom to avoid rendering issues related to routing
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>, // Mock BrowserRouter
  useNavigate: jest.fn(() => jest.fn()), // Mock useNavigate as a no-op function
}));

// Mock axios globally
jest.mock('axios');

// Optionally, you can mock the `import` function for environment variables
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_BACKEND_URL: 'http://localhost:4002', // Mock environment variable
      },
    },
  },
});
