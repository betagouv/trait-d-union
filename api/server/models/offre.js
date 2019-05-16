const createFindOffres = require('../features/offres/find-offres')
const json2csv = require('../utils/json-2-csv')

const { info } = require('../infrastructure/logger')
const cache = require('../infrastructure/cache')
const apiConfiguration = require('../infrastructure/api-configuration')

const poleEmploiApiService = require('../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })

module.exports = (Offre) => {
  Offre.sourceOffres = async () => {
    const offres = await sourceOffres(Offre)
    await destroyOffres(Offre)
    await persistOffres(offres, Offre)
    return offres
  }

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

async function sourceOffres (Offre) {
  const findOffres = createFindOffres(Offre.app.models, [offresRepository])
  const result = await findOffres({ around: {} })
  const offresWithEmailCount = countOffresWithEmail(result)
  info(`Source ${result.length} offres, ${offresWithEmailCount} offres with email`)
  return result
}

function countOffresWithEmail (offres) {
  const result = offres.filter(({ contact }) => contact && contact.courriel)
  return result.length
}

async function persistOffres (offres, Offre) {
  const createOffrePromises = offres.map(offre => Offre.create({ id: offre.id, data: offre }))
  return Promise.all(createOffrePromises)
}

async function destroyOffres (Offre) {
  return Offre.destroyAll()
}
