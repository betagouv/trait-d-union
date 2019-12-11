const Models = require('../../models')
const collectionResponse = require('../../utils/collection-response')
const listOffres = require('../../services/offres/list-offres-service')(Models)

module.exports.createRoute = (pathPrefix) => ({
  method: 'GET',
  path: `${pathPrefix}/offres`,
  options: {
    auth: 'session',
    description: 'Récupération des offres de PMSMP',
    tags: ['api', 'offres'],
    plugins: { 'hapi-swaggered': { responses: { 200: { description: 'Success' } } } }
  },
  handler: async (request, h) => {
    const { offset, limit, status } = request.query
    const userId = request.auth.credentials.id
    const { rows: offres, count } = await listOffres(userId, {
      offset,
      limit,
      status
    })
    return collectionResponse({
      h,
      itemName: 'offres',
      collection: offres,
      allItemsCount: count,
      offset,
      limit
    })
  }
})
