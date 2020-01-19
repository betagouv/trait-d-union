const Models = require('../../models')

const logger = require('../../utils/logger')
const { promisify } = require('util')
const Boom = require('@hapi/boom')

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/candidats/reset-password`,
  options: {
    description: 'Reset password for given candidat',
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

    const resetPassword = promisify(Candidat.resetPassword)
    try {
      await resetPassword.call(Candidat, payload.email, payload.password, null)
      return h.response().code(204)
    } catch (err) {
      logger().error(`Reset password errored: ${err}`)
      throw Boom.badImplementation(err.message, err)
    }
  }
})
