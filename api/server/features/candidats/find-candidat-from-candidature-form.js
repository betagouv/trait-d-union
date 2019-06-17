module.exports = async ({ Candidat }, candidatureForm) => {
  const candidat = Object.assign({}, candidatureForm)
  let candidatFound = await Candidat.findById(candidatureForm.id)
  if (!candidatFound) {
    candidatFound = await Candidat.findOne({ where: { email: candidatureForm.email } })
    if (!candidatFound) {
      return null
    }
    candidat.id = candidatFound.id
  }
  return candidat
}
