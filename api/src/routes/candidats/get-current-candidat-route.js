module.exports.createRoute = (pathPrefix) => ({
  method: 'GET',
  path: `${pathPrefix}/candidats/me`,
  options: {
    auth: 'session',
    description: 'Retourne l\'utilisateur connecté (identifié via le cookie)',
    tags: ['api', 'candidats'],
    validate: {},
    plugins: {
      'hapi-swaggered': {
        security: [{ OAuth: ['openid', 'profile'] }],
        responses: { 200: { description: 'Success' } }
      }
    }
  },
  handler: async (request, h) => {
    return h.response(request.auth.credentials)
  }
})
