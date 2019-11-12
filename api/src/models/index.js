const path = require('path')
const fs = require('fs')
const camelize = require('uppercamelcase')

const models = fs.readdirSync(__dirname)
  .filter((filename) => !filename.startsWith('.'))
  .filter((filename) => !filename.startsWith('index'))
  .filter((filename) => !filename.endsWith('itest.js'))
  .filter((filename) => !filename.includes('enums'))
  .map((filename) => ({
    filename,
    module: require(path.join(__dirname, filename))
  }))
  .map(({ module, filename }) => ({
    module,
    name: camelize(path.basename(filename, '.js'))
  }))
  .reduce((models, { name, module }) => Object.assign(models, { [name]: module }), {})

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = models
