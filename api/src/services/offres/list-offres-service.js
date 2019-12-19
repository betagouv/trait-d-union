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
        where: { niveauEtudeEntree: userNiveauEtude }
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
