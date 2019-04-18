module.exports = ({ Metier }, { getOffres }) => async ({ around }) => {
  const metiers = await Metier.find()
  const filteredMetiers = keepMetiersWithSessions(metiers)
  const getOffresPromises = filteredMetiers.map(getOffreForMetier(getOffres))
  const allOffres = await Promise.all(getOffresPromises)
  const offres = flatten(allOffres)
  return removeDuplicates(offres)
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

const getOffreForMetier = (getOffres) => async (metier) => {
  const allOffres = await getOffres({ codeROME: metier.codeROME })
  const offres = removeDuplicates(allOffres)
  const sessions = extractSessionsFrom(metier)
  return assignSessionsToOffres(offres, sessions)
}

const flatten = _flatten
function _flatten (element) {
  return element instanceof Array
    ? [].concat([], ...element.map(_flatten))
    : element
}

const isFilled = _isFilled
function _isFilled (array) {
  return array.length > 0
}

const removeDuplicates = _removeDuplicates
function _removeDuplicates (array) {
  return Array.from(new Set(array))
}
