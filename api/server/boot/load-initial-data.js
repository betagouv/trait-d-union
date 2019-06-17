const loadReferentiels = require('../features/referentiels/load-referentiels')
const referentiels = require('../features/referentiels')
const createFakeOffres = require('../features/referentiels/create-fake-offres')

module.exports = async (app) => {
  await app.datasources.db.autoupdate()
  await loadReferentiels(app.models, referentiels)
  if (process.env.TU_FF_ADD_FAKE_OFFRE === 'on') {
    return createFakeOffres(app.models)
  }
}
