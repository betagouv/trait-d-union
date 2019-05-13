const flatten = require('../../utils/flatten-array')
const isFilled = require('../../utils/is-filled')
const removeDuplicates = require('../../utils/remove-duplicates')

const { debug } = require('../../infrastructure/logger')

module.exports = ({ Metier }, repositories, { executePromisesSequentially }) => async ({ around }) => {
  const metiers = await Metier.find()
  const filteredMetiers = keepMetiersWithSessions(metiers)
  debug(`Will get Offres for ${filteredMetiers.length} metiers`)
  debug(`${JSON.stringify(filteredMetiers.map(filteredMetiers => filteredMetiers.codeROME))}`)

  const offresFromAllRepositories = await Promise.all(repositories.map(getOffresFromRepository))
  return flatten(offresFromAllRepositories)

  async function getOffresFromRepository ({ getOffres }) {
    const getOffresForMetier = createGetOffresForMetier(getOffres)
    const allOffres = await executePromisesSequentially(filteredMetiers, getOffresForMetier)
    const offres = flatten(allOffres)
    return removeDuplicates(offres)
  }
}

function keepMetiersWithSessions (metiers) {
  return metiers.filter(metier =>
    isFilled(metier.diplomes()) && metier.diplomes().some(diplome =>
      isFilled(diplome.actions()) && diplome.actions().some(action =>
        isFilled(action.sessions()))))
}

function extractSessionsFrom (metier) {
  const actions = metier.diplomes().map(({ actions }) => actions())
  const sessions = flatten(actions).map(({ sessions }) => sessions())
  return flatten(sessions)
}

function assignSessionsToOffres (offres, sessions) {
  return offres.map(offre => Object.assign(offre, { sessions }))
}

const createGetOffresForMetier = (getOffres) => async (metier) => {
  const allOffres = await getOffres({ codeROME: metier.codeROME })
  const offres = removeDuplicates(allOffres)
  const sessions = extractSessionsFrom(metier)
  const enrichedOffres = await assignSessionsToOffres(offres, sessions)
  return enrichedOffres
}
