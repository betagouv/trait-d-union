const Joi = require('@hapi/joi')
const Models = require('../../models')
const getOffre = require('../../services/offres/get-offre-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'GET',
  path: `${pathPrefix}/offres/{offreId}`,
  config: {
    description: 'Récupération d\'une offre de PMSMP',
    tags: ['api', 'offres'],
    validate: {
      params: Joi.object({
        offreId: Joi.string().uuid()
          .required()
          .description('Offre ID')
      })
    },
    plugins: {
      'hapi-swaggered': {
        responses: {
          200: { description: 'Success' },
          400: { description: 'Bad Request' }
        }
      }
    },
    handler: async (request, h) => {
      return getOffre(request.params.offreId)
    }
  }
})
