const { debug } = require('../../infrastructure/logger')

module.exports = async ({ Offre, BlacklistedOffre, BlacklistedContact }) => {
  const blacklistedOffres = await BlacklistedOffre.find()
  const ids = blacklistedOffres.map(({ id }) => id)
  debug(`Blacklisting offres with ids: ${JSON.stringify(ids)}`)
  await Offre.updateAll({ id: { inq: ids } }, { status: 'blacklisted' })

  const blacklistedContacts = await BlacklistedContact.find()
  const emails = blacklistedContacts.map(({ email }) => email)
  debug(`Blacklisting offres with contact: ${JSON.stringify(emails)}`)
  await Offre.updateAll({ 'data.contact.courriel': { inq: emails } }, { status: 'blacklisted' })
}
