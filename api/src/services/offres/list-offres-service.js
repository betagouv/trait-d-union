module.exports = ({ Offre }) => async ({ limit, offset } = {}) => {
  return Offre.findAndCountAll()
}
