const noCandidateFound = null

module.exports = async ({ Candidat }, candidatureForm) => {
  if (!candidatureForm.id) {
    return noCandidateFound
  }
  const candidat = Object.assign({}, candidatureForm)
  let candidatFound = await Candidat.findById(candidatureForm.id)
  if (!candidatFound) {
    candidatFound = await Candidat.findOne({ where: { email: candidatureForm.email } })
    if (!candidatFound) {
      return noCandidateFound
    }
    candidat.id = candidatFound.id
  }
  return candidat
}
