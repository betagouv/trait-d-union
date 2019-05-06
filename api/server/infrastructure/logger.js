const bunyan = require('bunyan')
const logger = bunyan.createLogger({ name: 'traitdunion-api', level: 'debug' })

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
