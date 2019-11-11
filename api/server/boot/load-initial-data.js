const loadReferentiels = require('../features/referentiels/load-referentiels')
const referentiels = require('../features/referentiels')
const createFakeOffres = require('../features/referentiels/create-fake-offres')
const createFakeCandidat = require('../features/referentiels/create-fake-candidat')

module.exports = async (app) => {
  await app.datasources.db.autoupdate()
  await loadReferentiels(app.models, referentiels)
  if (process.env.TU_FF_ADD_FAKE_DATA === 'on') {
    await Promise.all([createFakeOffres(app.models), createFakeCandidat(app.models)]).catch(err => console.log(err))
  }
}
