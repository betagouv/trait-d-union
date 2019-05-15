const createFindOffres = require('../features/offres/find-offres')
const json2csv = require('../utils/json-2-csv')

const { info } = require('../infrastructure/logger')
const cache = require('../infrastructure/cache')
const apiConfiguration = require('../infrastructure/api-configuration')

const poleEmploiApiService = require('../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })

module.exports = (Offre) => {
  Offre.sortedOffres = async (req, res) => {
    const offres = await findOffres(Offre)
    const offresCSV = json2csv(JSON.stringify(offres))

    res.format({
      'text/csv': () => res.send(offresCSV),
      'application/json': () => res.send(offres)
    })
  }

  Offre.remoteMethod('sortedOffres', {
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } }
    ],
    http: { path: '/', verb: 'GET' },
    returns: { arg: 'offres', type: 'string', root: true }
  })
}

async function findOffres (Offre) {
  let resultats = cache.get('offres')
  if (resultats) {
    return resultats
  }
  const findOffres = createFindOffres(Offre.app.models, [offresRepository])
  resultats = await findOffres({ around: {} })
  info(`Found ${resultats.length} offres`)
  const resultatsWithEmail = resultats.filter(({ contact }) => contact && contact.courriel)
  info(`Found ${resultatsWithEmail.length} offres with email`)
  cache.set('offres', resultats)
  return resultats
}
