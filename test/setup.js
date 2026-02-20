
// Configure babel to transpile JS/JSX files
require('@babel/register')({
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ignore: [/node_modules/]
});

// Ignore style imports to prevent SyntaxError in tests
require.extensions['.css'] = () => {};
require.extensions['.scss'] = () => {};
require.extensions['.sass'] = () => {};

// Initialize JSDOM environment
const jsdom = require('global-jsdom');
jsdom();
