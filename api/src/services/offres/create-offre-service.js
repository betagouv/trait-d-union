module.exports = ({ Offre }) => async (offreToCreate) => {
  if (offreToCreate.codeROME) {
    offreToCreate.status = 'published'
  }
  return Offre.create(offreToCreate)
}
