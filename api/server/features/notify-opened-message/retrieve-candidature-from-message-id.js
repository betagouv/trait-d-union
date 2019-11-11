module.exports = async ({ Candidature }, messageId) => {
  const candidature = await Candidature.findOne({ where: { messageId }, include: ['candidat', 'offre'] })
  return candidature || null
}
