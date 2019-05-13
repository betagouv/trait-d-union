const createFindOffres = require('../features/offres/find-offres')
const { info } = require('../infrastructure/logger')
const cache = require('../infrastructure/cache')
const apiConfiguration = require('../infrastructure/api-configuration')
const wait = require('../infrastructure/wait')(1000)
const executePromisesSequentially = require('../infrastructure/execute-promise-sequentially')(wait)

const poleEmploiApiService = require('../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })
const labonneboiteRepository = require('../repositories/la-bonne-boite/la-bonne-boite-repository')({ poleEmploiApiService })

module.exports = (Offre) => {
  Offre.sortedOffres = async () => {
    const findOffres = createFindOffres(Offre.app.models, [offresRepository, labonneboiteRepository], { executePromisesSequentially })
    const resultats = await findOffres({ around: {} })
    info(`Found ${resultats.length} offres`)
    const resultatsWithEmail = resultats.filter(({ contact }) => contact && contact.courriel)
    info(`Found ${resultatsWithEmail.length} offres with email`)
    return resultats
  }

  Offre.remoteMethod('sortedOffres', {
    http: { path: '/', verb: 'GET' },
    returns: { arg: 'offres', type: 'object', root: true }
  })
}
