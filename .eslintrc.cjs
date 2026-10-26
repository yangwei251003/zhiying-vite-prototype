module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  plugins: ['react', 'react-hooks'],
  extends: ['plugin:react-hooks/recommended'],
  settings: { react: { version: '18.3' } },
  ignorePatterns: ['dist', 'node_modules'],
  rules: { 'no-undef': 'error', 'react/jsx-key': 'error' },
};
