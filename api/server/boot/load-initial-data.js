const loadReferentiels = require('../features/referentiels/load-referentiels')
const referentielActions = require('../features/referentiels/actions.json')
const referentielDiplomes = require('../features/referentiels/diplomes.json')
const referentielMetiers = require('../features/referentiels/metiers.json')
const referentielSessions = require('../features/referentiels/sessions.json')

module.exports = async (app) => {
  return loadReferentiels(app.models, { referentielActions, referentielDiplomes, referentielMetiers, referentielSessions })
}
