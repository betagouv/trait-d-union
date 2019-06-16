module.exports = async ({ smtpApiClient, Offre }, offreId, candidat) => {
  const offreFromDB = await Offre.findById(offreId)
  const offre = offreFromDB && offreFromDB.data
  if (!offre) {
    return
  }

  const templateId = destinataireIsPoleEmploi(offre) ? poleEmploiTemplateId : defaultTemplateId
  await smtpApiClient.sendTransacEmail({
    'templateId': templateId,
    'bcc': [{ 'email': 'chaib.martinez@beta.gouv.fr' }, { 'email': 'edwina.morize@beta.gouv.fr' }],
    'to': [{ 'email': offre.contact.courriel }],
    'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
    'params': {
      'Titre_offre': 'Titre offre',
      'id_offre': offreId,
      'Nom_prenom': candidat.nomPrenom,
      'URL_CV': candidat.cvUrl,
      'Age': candidat.telephone
    },
    'attachment': [{ 'url': candidat.cvUrl }]
  })

  return offre
}

function destinataireIsPoleEmploi ({ contact }) {
  return contact.courriel.includes('@pole-emploi.')
}

const poleEmploiTemplateId = 53
const defaultTemplateId = 52
