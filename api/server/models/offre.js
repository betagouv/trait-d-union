const createFindOffres = require('../features/offres/find-offres')

module.exports = (Offre) => {
  Offre.sortedOffres = async () => {
    const findOffres = createFindOffres(Offre.app.models)
    return findOffres({ around: {} })
  }

  Offre.remoteMethod('sortedOffres', {
    http: { path: '/', verb: 'GET' },
    returns: { arg: 'offres', type: 'object', root: true }
  })
}
