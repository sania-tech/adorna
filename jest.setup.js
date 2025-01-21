import { TextEncoder, TextDecoder } from 'util';

// Ensure TextEncoder and TextDecoder are polyfilled if they are not present
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Optionally, you can mock the `import` function for environment variables
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_BACKEND_URL: 'http://localhost:4000', // Mock environment variable
      },
    },
  },
});
