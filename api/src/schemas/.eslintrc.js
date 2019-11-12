module.exports = {
  extends: 'standard',
  env: {
    mocha: true,
    node: true,
    es6: true
  },
  plugins: ['mocha'],
  rules: {
    'newline-per-chained-call': 0,
  }
}
