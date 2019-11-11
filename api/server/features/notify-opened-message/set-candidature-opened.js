module.exports = async (candidature) => {
  return candidature.updateAttribute('status', 'opened')
}
