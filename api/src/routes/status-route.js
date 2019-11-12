const { statusSchema } = require('../schemas/status-schemas')
const Models = require('../models')
const getStatus = require('../services/status/status-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'GET',
  path: `${pathPrefix}/status`,
  config: {
    auth: false,
    handler,
    tags: ['api', 'status'],
    plugins: {
      'hapi-swagger': {
        'x-description': 'Test',
        security: [{ OAuth: ['openid', 'profile'] }],
        responses: {
          200: {
            description: 'Success',
            schema: statusSchema
          }
        }
      }
    }
  }
})

async function handler () {
  return getStatus()
}
