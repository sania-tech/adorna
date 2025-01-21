// Import TextEncoder and TextDecoder from util module
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder and TextDecoder if they are not defined globally
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Existing global setup for VITE_BACKEND_URL (mock environment variable)
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_BACKEND_URL: 'http://localhost:4000', // Mock environment variable
      },
    },
  },
});
