module.exports = ({ Offre }) => async ({ limit, offset, status } = {}) => {
  const options = {
    offset,
    limit
  }
  if (status) {
    options.where = { status }
  }
  return Offre.findAndCountAll(options)
}
