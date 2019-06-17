const { error } = require('../../infrastructure/logger')

module.exports = async ({ smtpApiClient }, { offre, candidat }) => {
  const templateId = destinataireIsPoleEmploi(offre) ? poleEmploiTemplateId : defaultTemplateId
  await smtpApiClient.sendTransacEmail({
    templateId,
    bcc: [{ email: 'chaib.martinez@beta.gouv.fr' }, { email: 'edwina.morize@beta.gouv.fr' }],
    to: [{ name: offre.contact.nom, email: offre.contact.courriel }],
    replyTo: { name: candidat.nomPrenom, email: candidat.email },
    params: {
      Titre_offre: offre.intitule,
      id_offre: offre.id,
      Nom_prenom: candidat.nomPrenom,
      URL_CV: candidat.cvUrl,
      Age: candidat.telephone
    },
    attachment: [{ url: candidat.cvUrl }]
  }).catch(err => {
    error(`Error while sending candidature email with SendInBlue - ${err.response.text}`)
    throw err
  })
}

function destinataireIsPoleEmploi ({ contact }) {
  return contact.courriel.includes('@pole-emploi.')
}

const poleEmploiTemplateId = 53
const defaultTemplateId = 52
