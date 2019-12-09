const Models = require('../../models')
const Joi = require('@hapi/joi')
const logger = require('../../utils/logger')
const { promisify } = require('util')
const Boom = require('@hapi/boom')

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/candidats/login`,
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    },
    description: 'Login candidat',
    tags: ['api', 'candidat'],
    plugins: {
      'hapi-swaggered': {
        responses: {
          200: { description: 'Success' },
          400: { description: 'Bad Request' }
        }
      }
    }
  },
  handler: async (request, h) => {
    const { payload } = request
    const { Candidat } = Models
    const authenticateUser = promisify(Candidat.authenticate())
    try {
      const candidat = await authenticateUser.call(Candidat, payload.email, payload.password)
      if (!candidat) {
        throw Boom.badRequest('Cannot login user with provided credentials.')
      }
      request.cookieAuth.set({ id: candidat.id })
      return h.response()
    } catch (err) {
      if (err.message.startsWith('Cannot login user with provided credentials.')) {
        throw err
      }
      logger().error(`Login candidat errored: ${err}`)
      throw Boom.badImplementation(err.message, err)
    }
  }
})
