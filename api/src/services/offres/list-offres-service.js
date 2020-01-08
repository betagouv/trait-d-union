const niveauxEtude = require('../../models/enums/niveaux-etude')

module.exports = ({ Metier, Diplome, Offre, Candidature, Candidat }) => async (userId, userNiveauEtude, { limit, offset, status } = {}) => {
  const options = {
    order: [
      ['address', 'ASC']
    ],
    include: [{
      model: Candidature,
      include: [{
        model: Candidat,
        attributes: ['id'],
        where: { id: userId }
      }]
    }, {
      required: true,
      model: Metier,
      include: [{
        model: Diplome,
        attributes: ['niveauEtudeEntree'],
        where: { niveauEtudeEntree: availableNiveauxEtude(userNiveauEtude) }
      }]
    }],
    offset,
    limit
  }
  if (status) {
    options.where = { status }
  }
  return Offre.findAndCountAll(options)
}

function availableNiveauxEtude (niveauEtude) {
  return niveauxEtude.slice(0).reduce((availableNiveauxEtude, curr, index, arr) => {
    availableNiveauxEtude.push(curr)
    if (niveauEtude === curr) {
      arr.splice(1)
    }
    return availableNiveauxEtude
  }, [])
}
