const Joi = require('@hapi/joi')
const Envie = require('envie')

const environmentVariables = Envie({
  PORT: Joi
    .number()
    .integer()
    .positive()
    .min(0)
    .default(8080)
    .description('Port on which the HTTP server will listen'),

  LOG_LEVEL: Joi
    .string()
    .only()
    .allow('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .default('info')
    .description('Level of verbosity for the logs'),

  HOST_NAME: Joi
    .string()
    .default('localhost:8080')
    .description('Hostname used in Swagger documentation - shall contain port also'),

  AUTH0_BASE_URL: Joi
    .string()
    .uri({ scheme: ['https', 'http'] })
    .description('Auth0 base url'),

  OAUTH_CLIENT_ID: Joi
    .string()
    .description('Client ID of Auth0 application used for swagger')
})

module.exports = environmentVariables
