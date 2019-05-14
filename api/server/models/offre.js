const createFindOffres = require('../features/offres/find-offres')
const { info } = require('../infrastructure/logger')
const cache = require('../infrastructure/cache')
const apiConfiguration = require('../infrastructure/api-configuration')

const poleEmploiApiService = require('../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })

module.exports = (Offre) => {
  Offre.sortedOffres = async () => {
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

  Offre.remoteMethod('sortedOffres', {
    http: { path: '/', verb: 'GET' },
    returns: { arg: 'offres', type: 'object', root: true }
  })
}
