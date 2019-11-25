const flatten = require('../../utils/flatten-array')

const logger = require('../../utils/logger')

module.exports = ({ Metier }, repositories) => async (departement) => {
  let metiers = await Metier.findAll()
  metiers = metiers.slice(0, 5)
  const codesROME = extractCodesROME(metiers)
  logger().debug(`Will get Offres in departement ${departement} for ${metiers.length} metiers:\n${codesROME}`)

  if (codesROME.length === 0) {
    return []
  }
  const getOffresForRepository = createGetOffresForRepository(codesROME, departement)
  const offresFromAllRepositories = await Promise.all(repositories.map(getOffresForRepository))
  return flatten(offresFromAllRepositories)
}

const createGetOffresForRepository = (codesROME, departement) => async ({ getOffres }) => {
  return getOffres(codesROME, departement)
}

function extractCodesROME (metiers) {
  return metiers.map(metiers => metiers.codeROME)
}
