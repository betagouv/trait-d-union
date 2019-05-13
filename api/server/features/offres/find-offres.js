const flatten = require('../../utils/flatten-array')
const isFilled = require('../../utils/is-filled')

const { debug } = require('../../infrastructure/logger')

module.exports = ({ Metier, SessionFormation }, repositories) => async ({ around }) => {
  const metiers = await Metier.find()
  const filteredMetiers = keepMetiersWithSessions(metiers)
  const codesROME = extractCodesROME(filteredMetiers)
  debug(`Will get Offres for ${filteredMetiers.length} metiers:\n${codesROME}`)

  if (codesROME.length === 0) {
    return []
  }
  const getOffresForRepository = createGetOffresForRepository(filteredMetiers, codesROME)
  const offresFromAllRepositories = await Promise.all(repositories.map(getOffresForRepository))
  return flatten(offresFromAllRepositories)
}

const createGetOffresForRepository = (metiers, codesROME) => async ({ getOffres }) => {
  const offres = await getOffres(codesROME)
  return offres.map(offre => {
    const metier = metiers.find(metier => metier.codeROME === offre.codeROME)
    const sessions = extractSessionsFrom(metier)
    return assignSessionsToOffres([offre], sessions)
  })
}

function extractCodesROME (metiers) {
  return metiers.map(metiers => metiers.codeROME)
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
