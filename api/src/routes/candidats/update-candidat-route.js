const Models = require('../../models')
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))
const niveauxEtude = require('../../models/enums/niveaux-etude')
const deStatuses = require('../../models/enums/de-statuses')
const logger = require('../../utils/logger')
const Boom = require('@hapi/boom')

module.exports.createRoute = (pathPrefix) => ({
  method: 'PATCH',
  path: `${pathPrefix}/candidats/me`,
  options: {
    auth: 'session',
    validate: {
      payload: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        niveauEtude: Joi.string().only()
          .allow(...niveauxEtude),
        phoneNumber: Joi.string(),
        zipCode: Joi.string(),
        deStatus: Joi.only()
          .allow(...deStatuses),
        birthdate: Joi.date()
          .format(['YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY', 'DD/MM/YYYY'])
          .raw()
      })
    },
    description: 'Met à jour le profil du candidat connecté',
    tags: ['api', 'candidat'],
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
    const { payload } = request
    const { Candidat } = Models

    try {
      await Candidat.update(payload, { where: { id: request.auth.credentials.id } })
      return Candidat.findByPk(request.auth.credentials.id,
        { attributes: { exclude: ['password', 'salt', 'activationKey', 'verified', 'resetPasswordKey'] } }
      )
    } catch (err) {
      logger().error(`Update candidat errored: ${err}`)
      throw Boom.badImplementation(err.message, err)
    }
  }
})
