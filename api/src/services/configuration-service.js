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

  DATABASE_URL: Joi
    .string()
    .uri({ scheme: 'postgres' })
    .description('Connection string to the main Postgres database'),

  AUTH0_BASE_URL: Joi
    .string()
    .uri({ scheme: ['https', 'http'] })
    .description('Auth0 base url'),

  OAUTH_CLIENT_ID: Joi
    .string()
    .description('Client ID of Auth0 application used for swagger'),

  E2E_TEST: Joi
    .boolean()
    .default(false)
    .description('Set to true if E2E testing is in progress'),

  E2E_TEST_DATABASE_URL: Joi
    .string()
    .uri({ scheme: 'postgres' })
    .default('postgres://trait:dunion@db/traitdunion-e2e')
    .description('Connection string to the end-to-end tests Postgres database'),

  ALLOWED_ORIGIN: Joi
    .string()
    .uri({ scheme: ['http', 'https'] })
    .default('http://localhost:3000')
    .description('Front application URL allowed to call API'),

  TU_FF_NOTIFY_ON_SLACK: Joi
    .string()
    .allow('on', 'off')
    .default('on')
    .description('Activate notification on Slack dedicated channel'),

  TU_FF_USE_REAL_SENDINBLUE: Joi
    .string()
    .allow('on', 'off')
    .default('on')
    .description('Activate notification on Slack dedicated channel'),

  TU_FF_SCHEDULE_SOURCING: Joi
    .string()
    .allow('on', 'off')
    .default('on')
    .description('Activate scheduling of sourcing scripts'),

  SLACK_NOTIFICATION_CHANNEL: Joi
    .string()
    .default('#startup-tu-notif')
    .description('Slack channel on which notifications are sent to - shall start with a #'),

  SLACK_HOOK_URL: Joi
    .string()
    .uri({ scheme: 'https' })
    .description('Slack hook url'),

  OFFRE_PUBLISHED_HOOK_URL: Joi
    .string()
    .uri({ scheme: 'https' })
    .description('Zapier hook url called when a offre is published'),

  CANDIDATURE_RECEIVED_HOOK_URL: Joi
    .string()
    .uri({ scheme: 'https' })
    .description('Zapier hook url called when a candidature is created'),

  CANDIDAT_CREATED_HOOK_URL: Joi
    .string()
    .uri({ scheme: 'https' })
    .description('Zapier hook url called when a candidat is created'),

  COOKIE_PASSWORD: Joi
    .string()
    .min(32)
    .description('Authentication cookie password. Should be at least 32 characters long')
})

module.exports = environmentVariables
