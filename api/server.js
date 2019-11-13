const Hapi = require('@hapi/hapi')
const databaseService = require('./src/services/database-service')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Pino = require('hapi-pino')
const HapiSwagger = require('hapi-swaggered')
const HapiSwaggerUI = require('hapi-swaggered-ui')
const AuthJwt = require('hapi-auth-jwt2')
const jwksRsa = require('jwks-rsa')
const pinoBaseOptions = require('./src/utils/pino-options')
const Pack = require('./package')
const configurationService = require('./src/services/configuration-service')
const routes = require('./src/routes')

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
  const swaggerOptions = _getSwaggerOptions()
  const swaggerUIOptions = _getSwaggerUIOptions(server.info.protocol)
  const pinoOptions = _getPinoOptions()
  const auth0BaseUrl = configurationService.get('AUTH0_BASE_URL')

  await server.register([
    Inert,
    Vision,
    AuthJwt,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    {
      plugin: HapiSwaggerUI,
      options: swaggerUIOptions
    },
    {
      plugin: Pino,
      options: pinoOptions
    }
  ])

  server.auth.strategy('jwt', 'jwt', {
    complete: true,
    key: jwksRsa.hapiJwt2KeyAsync({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${auth0BaseUrl}/.well-known/jwks.json`
    }),
    verifyOptions: {
      issuer: `${auth0BaseUrl}/`,
      algorithms: ['RS256']
    },
    validate: _validateUser
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

  function _validateUser (decoded, request, callback) {
    // This is a simple check that the `sub` claim
    // exists in the Access Token. Modify it to suit
    // the needs of your application
    if (decoded && decoded.sub) {
      if (decoded.scope) {
        return callback(null, true, { scope: decoded.scope.split(' ') })
      }

      return callback(null, true)
    }

    return callback(null, false)
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
