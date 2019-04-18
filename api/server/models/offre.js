const createFindOffres = require('../features/offres/find-offres')
const offresRepository = require('../repositories/offres-pole-emploi-repository')

module.exports = (Offre) => {
  Offre.sortedOffres = async () => {
    const findOffres = createFindOffres(Offre.app.models, offresRepository)
    return findOffres({ around: {} })
  }

  Offre.remoteMethod('sortedOffres', {
    http: { path: '/', verb: 'GET' },
    returns: { arg: 'offres', type: 'object', root: true }
  })
}
