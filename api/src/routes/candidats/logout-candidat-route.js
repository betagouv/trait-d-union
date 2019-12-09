module.exports.createRoute = (pathPrefix) => ({
  method: 'POST',
  path: `${pathPrefix}/candidats/logout`,
  options: {
    description: 'Logout candidat',
    tags: ['api', 'candidat'],
    plugins: {
      'hapi-swaggered': {
        responses: {
          201: { description: 'Success' },
          400: { description: 'Bad Request' }
        }
      }
    }
  },
  handler: async (request, h) => {
    request.cookieAuth.clear()
    return h.response()
  }
})
