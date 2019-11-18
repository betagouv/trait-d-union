module.exports = {
  extends: 'standard',
  env: {
    mocha: true,
    node: true,
    es6: true
  },
  plugins: ['mocha'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', 'consistent'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'multiline': true, 'minProperties': 2 },
      'ObjectPattern': { 'multiline': true },
      'ImportDeclaration': 'never',
      'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
    }],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': false }],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
    'mocha/no-exclusive-tests': 'error',
    'no-console': 2
  }
}
