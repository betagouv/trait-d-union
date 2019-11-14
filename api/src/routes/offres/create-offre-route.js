const Models = require('../../models')
const Joi = require('@hapi/joi')
const createOffre = require('../../services/offres/create-offre-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/offres`,
  config: {
    description: 'Création d\'une offre de PMSMP',
    tags: ['api', 'offres'],
    validate: { payload: Joi.object() },
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
