const pinoOptions = require('./pino-options')
const pino = require('pino')(pinoOptions)

module.exports = () => pino
