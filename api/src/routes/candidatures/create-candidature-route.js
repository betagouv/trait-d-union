const Models = require('../../models')
const createOffre = require('../../services/candidatures/create-candidatures-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/candidatures`,
  config: {
    description: 'Création d\'une candidature à une offre de PMSMP donnée',
    tags: ['api', 'candidature'],
    plugins: {
      'hapi-swaggered': {
        responses: {
          201: { description: 'Created' },
          400: { description: 'Bad Request' }
        }
      }
    },
    handler: async (request, h) => {
      const offre = await createOffre(request.payload)
      return h.response(offre).created()
    }
  }
})
