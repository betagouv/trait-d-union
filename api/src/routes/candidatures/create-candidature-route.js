const Models = require('../../models')
const Joi = require('@hapi/joi')
const createCandidature = require('../../services/candidatures/create-candidatures-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/offres/{offreId}/candidatures`,
  options: {
    auth: 'session',
    validate: { params: Joi.object({ offreId: Joi.string().uuid() }) },
    description: 'Création d\'une candidature à une offre de PMSMP donnée',
    tags: ['api', 'candidatures'],
    plugins: {
      'hapi-swaggered': {
        responses: {
          204: { description: 'No Content' },
          400: { description: 'Bad Request' }
        }
      }
    }
  },
  handler: async (request, h) => {
    await createCandidature({
      offreId: request.params.offreId,
      candidatId: request.auth.credentials.id
    })
    return h.response().created()
  }
})
