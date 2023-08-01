module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  plugins: ['import', 'node', 'promise'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.ts'] } },
  },
  rules: {
    'promise/always-return': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
  },
}
