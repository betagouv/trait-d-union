const configurationService = require('../services/configuration-service')

const isProduction = configurationService.get('NODE_ENV') === 'production'

module.exports = {
  level: configurationService.get('LOG_LEVEL'),
  prettyPrint: isProduction ? false : { forceColor: true }
}
