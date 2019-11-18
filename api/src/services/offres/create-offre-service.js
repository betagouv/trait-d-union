module.exports = ({ Offre }) => async (offreToCreate) => {
  return Offre.create(offreToCreate)
}
