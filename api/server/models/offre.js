const createFindOffres = require('../features/offres/find-offres')
const cache = require('../infrastructure/cache')
const apiConfiguration = require('../infrastructure/api-configuration')
const wait = require('../infrastructure/wait')(1000)
const executePromisesSequentially = require('../infrastructure/execute-promise-sequentially')(wait)

const poleEmploiApiService = require('../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../repositories/offres-pole-emploi-repository')({ poleEmploiApiService })

module.exports = (Offre) => {
  Offre.sortedOffres = async () => {
    const findOffres = createFindOffres(Offre.app.models, offresRepository, { executePromisesSequentially })
    return findOffres({ around: {} })
  }

  Offre.remoteMethod('sortedOffres', {
    http: { path: '/', verb: 'GET' },
    returns: { arg: 'offres', type: 'object', root: true }
  })
}
