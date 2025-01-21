module.exports = {
  presets: [
    '@babel/preset-env',   // Ensures ES6+ syntax is compiled to compatible JavaScript
    '@babel/preset-react', // Handles JSX
  ],

  plugins: [
    '@babel/plugin-transform-runtime', // For better async handling and code splitting
    '@babel/plugin-syntax-import-meta', // For supporting `import.meta`
    '@babel/plugin-transform-modules-commonjs' // Transforms ESM to CommonJS for compatibility with Jest
  ]
};




