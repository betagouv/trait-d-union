const blacklistOffres = require('../features/offres/blacklist-offres')

module.exports = function (Blacklistedoffre) {
  Blacklistedoffre.afterRemote('create', async () => {
    await blacklistOffres(Blacklistedoffre.app.models)
  })
}
