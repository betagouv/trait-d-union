const Hapi = require('@hapi/hapi')
const databaseService = require('./src/services/database-service')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Pino = require('hapi-pino')
const HapiSwagger = require('hapi-swaggered')
const HapiSwaggerUI = require('hapi-swaggered-ui')
const pinoBaseOptions = require('./src/utils/pino-options')
const Pack = require('./package')
const configurationService = require('./src/services/configuration-service')
const routes = require('./src/routes')
const HapiCors = require('hapi-cors')
const HapiRequireHttps = require('hapi-require-https')
const HapiAuthCookie = require('@hapi/cookie')
const Models = require('./src/models')
const credentialsFromCookie = require('./src/services/authentication-service')(Models)

exports.createServer = async () => {
  const serverInstance = new Hapi.Server({
    port: configurationService.get('PORT'),
    host: configurationService.get('HOST')
  })
  serverInstance.event('onPreStart', () => {
    databaseService.sync()
  })
  return serverInstance
}

exports.registerPlugins = async (server) => {
  await server.register([
    Inert,
    Vision,
    HapiAuthCookie,
    HapiRequireHttps,
    {
      plugin: HapiCors,
      options: _getCorsOptions()
    },
    {
      plugin: HapiSwagger,
      options: _getSwaggerOptions()
    },
    {
      plugin: HapiSwaggerUI,
      options: _getSwaggerUIOptions(server.info.protocol)
    },
    {
      plugin: Pino,
      options: _getPinoOptions()
    }
  ])

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'traitdunion',
      password: configurationService.get('COOKIE_PASSWORD'),
      path: '/',
      isSecure: false, // required for non-https applications
      ttl: 24 * 60 * 60 * 1000, // Set session to 1 day,
      clearInvalid: true
    },
    keepAlive: true,
    validateFunc: async (request, session) => {
      const { valid, credentials } = await credentialsFromCookie(session)
      return {
        credentials,
        valid
      }
    }
  })

  server.ext('onPreResponse', (request, h) => {
    const response = request.response
    if (!response.isBoom) {
      return h.continue
    }

    const is4xx = response.output.statusCode >= 400 && response.output.statusCode < 500
    if (is4xx && response.data) {
      response.output.payload.data = response.data
    }

    return h.continue
  })

  server.route(routes)
  return server

  function _getCorsOptions () {
    return { origins: [configurationService.get('ALLOWED_ORIGIN')] }
  }

  function _getSwaggerUIOptions (protocol) {
    return {
      path: '/documentation',
      swaggerOptions: {
        defaultModelsExpandDepth: 0,
        defaultModelExpandDepth: 5,
        defaultModelRendering: 'model',
        displayRequestDuration: true,
        operationsSorter: 'method',
        docExpansion: 'list',
        oauth2RedirectUrl: `${protocol}://${configurationService.get(
          'HOST_NAME'
        )}/documentation/oauth2-redirect.html`
      },
      oauthOptions: { clientId: `${configurationService.get('OAUTH_CLIENT_ID')}` },
      auth: false,
      authorization: {
        field: 'Authorization',
        scope: 'header',
        valuePrefix: 'Bearer '
      }
    }
  }

  function _getSwaggerOptions () {
    return {
      info: {
        title: 'Trait d\'Union API - Documentation',
        version: Pack.version
      },
      tagging: { mode: 'tags' },
      responseValidation: false,
      schemes: [],
      host: `${configurationService.get('HOST_NAME')}`,
      securityDefinitions: {
        OAuth: {
          type: 'oauth2',
          authorizationUrl: `${configurationService.get('AUTH0_BASE_URL')}/authorize`,
          flow: 'implicit',
          scopes: {
            openid: 'openid',
            profile: 'profile'
          }
        }
      }
    }
  }

  function _getPinoOptions () {
    return Object.assign({}, pinoBaseOptions, {
      logEvents: [
        'onPostStart',
        'onPostStop',
        'response',
        'request-error',
        'onRequest',
        'log'
      ]
    })
  }
}
