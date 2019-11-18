module.exports = ({ Candidat }) => async ({ limit, offset } = {}) => {
  return Candidat.findAndCountAll()
}
