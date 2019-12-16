module.exports = ({ Offre, Candidature, Candidat }) => async (userId, { limit, offset, status } = {}) => {
  const options = {
    include: [
      {
        model: Candidature,
        include: [{
          model: Candidat,
          attributes: ['id'],
          where: { id: userId }
        }]
      }
    ],
    offset,
    limit
  }
  if (status) {
    options.where = { status }
  }
  return Offre.findAndCountAll(options)
}
