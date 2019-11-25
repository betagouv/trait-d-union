const Models = require('../../models')
const sourceOffres = require('../../services/sourcing/source-offres')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/sourcing`,
  config: {
    description: 'Source offres from Pole Emploi API',
    tags: ['api', 'sourcing'],
    plugins: {
      'hapi-swaggered': {
        responses: {
          200: { description: 'Success' },
          400: { description: 'Bad Request' }
        }
      }
    },
    handler: async (request, h) => {
      const offres = await sourceOffres(54)
      return offres
    }
  }
})
