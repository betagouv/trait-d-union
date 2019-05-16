const json2csv = require('../utils/json-2-csv')
const sourceOffres = require('../features/offres/source-offres')

module.exports = (Offre) => {
  Offre.sourceOffres = () => sourceOffres({ Offre })

  Offre.remoteMethod('sourceOffres', {
    http: { path: '/source', verb: 'POST' },
    returns: { arg: 'offres', type: 'string', root: true }
  })

  Offre.afterRemote('find', async (context) => {
    if (context.result) {
      context.result = context.result.map(({ data }) => data)
    }
  })

  Offre.afterRemote('**', async (context) => {
    if (context.result && context.req.query.format === 'csv') {
      const offres = context.result
      context.res.setHeader('Content-Type', 'text/csv')
      context.res.end(json2csv(JSON.stringify(offres)))
    }
  })
}
