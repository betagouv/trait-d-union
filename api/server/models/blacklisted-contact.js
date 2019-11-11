const blacklistOffres = require('../features/offres/blacklist-offres')

module.exports = function (Blacklistedcontact) {
  Blacklistedcontact.afterRemote('create', async () => {
    await blacklistOffres(Blacklistedcontact.app.models)
  })
}
