module.exports = ({ Candidature }) => async (candidatureToCreate) => {
  return Candidature.create(candidatureToCreate)
}
