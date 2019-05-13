const bunyan = require('bunyan')
const bformat = require('bunyan-format')
const formatOut = bformat({ outputMode: 'short' })

const logger = bunyan.createLogger({ name: 'traitdunion-api', stream: formatOut, level: process.env.LOG_LEVEL || 'info' })

if (process.env.NODE_ENV === 'test') {
  logger.level(bunyan.FATAL + 1)
}

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
