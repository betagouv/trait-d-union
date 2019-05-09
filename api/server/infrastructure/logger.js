const bunyan = require('bunyan')
const bformat = require('bunyan-format')
const formatOut = bformat({ outputMode: 'short' })

const logger = bunyan.createLogger({ name: 'traitdunion-api', stream: formatOut, level: 'debug' })

const debug = logger.debug.bind(logger)
const warn = logger.warn.bind(logger)
const info = logger.info.bind(logger)
const error = logger.error.bind(logger)

module.exports = {
  debug,
  info,
  warn,
  error
}
