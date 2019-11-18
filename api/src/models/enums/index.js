const path = require('path')
const fs = require('fs')
const camelize = require('camelcase')

const models = fs.readdirSync(__dirname)
  .filter((filename) => !filename.startsWith('.'))
  .filter((filename) => !filename.startsWith('index'))
  .filter((filename) => !filename.endsWith('test.js'))
  .map((filename) => ({
    filename,
    module: require(path.join(__dirname, filename))
  }))
  .map(({ module, filename }) => ({
    module,
    name: camelize(path.basename(filename, '.js'))
  }))
  .reduce((models, { name, module }) => Object.assign(models, { [name]: module }), {})

module.exports = models
