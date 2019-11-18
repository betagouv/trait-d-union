module.exports = ({ Offre }) => async (offreId) => {
  return Offre.findByPk(offreId)
}
