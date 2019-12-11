const Models = require('../../models')
const Joi = require('@hapi/joi')
const logger = require('../../utils/logger')
const { promisify } = require('util')
const Boom = require('@hapi/boom')

module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/candidats/register`,
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    },
    description: 'Register new candidat',
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
    const userToCreate = new Candidat({ email: payload.email })

    const registerUser = promisify(Candidat.register)
    try {
      const { id } = await registerUser.call(Candidat, userToCreate, payload.password)
      request.cookieAuth.set({ id })
      return h.response().code(204)
    } catch (err) {
      logger().error(`Register new candidat errored: ${err}`)
      if (err.message.startsWith('User already exists with ')) {
        throw Boom.conflict(err.message)
      }
      throw Boom.badImplementation(err.message, err)
    }
  }
})
