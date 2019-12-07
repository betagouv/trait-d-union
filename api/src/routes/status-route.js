const { statusSchema } = require('../schemas/status-schemas')
const Models = require('../models')
const getStatus = require('../services/status/status-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'GET',
  path: `${pathPrefix}/status`,
  options: {
    auth: false,
    description: 'API status to get current version and sha1 commit',
    tags: ['api', 'status'],
    plugins: {
      'hapi-swaggered': {
        security: [{ OAuth: ['openid', 'profile'] }],
        responses: {
          200: {
            description: 'Success',
            schema: statusSchema
          }
        }
      }
    }
  },
  handler
})

async function handler () {
  return getStatus()
}
