const Models = require('../../models')
const collectionResponse = require('../../utils/collection-response')
const listCandidats = require('../../services/candidats/list-candidats-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'GET',
  path: `${pathPrefix}/candidatures`,
  config: {
    description: 'Liste tous les candidats',
    tags: ['api', 'candidats'],
    validate: {},
    plugins: {
      'hapi-swaggered': {
        security: [{ OAuth: ['openid', 'profile'] }],
        responses: { 200: { description: 'Success' } }
      }
    },
    handler: async (request, h) => {
      const { rows: candidats, count } = await listCandidats()
      const { offset, limit } = request.query

      return collectionResponse({
        h,
        itemName: 'candidats',
        collection: candidats,
        allItemsCount: count,
        offset,
        limit
      })
    }
  }
})
