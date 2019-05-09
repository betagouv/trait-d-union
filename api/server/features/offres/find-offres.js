module.exports = ({ Metier }, repositories, { executePromisesSequentially }) => async ({ around }) => {
  const offresFromAllRepositories = await Promise.all(repositories.map(getOffresFromRepository))
  return flatten(offresFromAllRepositories)

  async function getOffresFromRepository ({ getOffres }) {
    const getOffresForMetier = createGetOffresForMetier(getOffres)
    const metiers = await Metier.find()
    const filteredMetiers = keepMetiersWithSessions(metiers)
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

function _removeDuplicates (arr) {
  return arr
    .map(e => e.id)
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e])
}
