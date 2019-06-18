const { debug } = require('../../infrastructure/logger')

module.exports = async ({ Candidat }, { offres, userId }) => {
  const user = await Candidat.findOne({ where: { id: userId }, include: 'candidatures' })

  const appliedOffresId = user ? user.candidatures().map(({ id }) => id) : []
  debug(`Found user candidatures: ${appliedOffresId}`)

  return offres.map(offre => {
    return Object.assign({},
      offre,
      { candidatureStatus: appliedOffresId.includes(offre.id) ? 'applied-offre' : 'non-responded-offre' })
  })
}
