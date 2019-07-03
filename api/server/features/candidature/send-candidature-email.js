const { debug, error } = require('../../infrastructure/logger')

module.exports = async ({ smtpApiClient }, { offre, candidat }) => {
  const cvUrl = normalizeRemoveDiacretics(candidat.cvUrl)
  const templateId = destinataireIsPoleEmploi(offre) ? poleEmploiTemplateId : defaultTemplateId
  const attachment = destinataireIsPoleEmploi(offre) ? [PNSMPattachment, { url: cvUrl }] : [PNSMPattachment]

  const messageResponse = await smtpApiClient.sendTransacEmail({
    templateId,
    bcc: [{ email: 'chaib.martinez@beta.gouv.fr' }, { email: 'edwina.morize@beta.gouv.fr' }],
    to: [{ name: offre.contact.nom, email: offre.contact.courriel }],
    replyTo: { name: candidat.nomPrenom, email: candidat.email },
    params: {
      Titre_offre: offre.intitule,
      id_offre: offre.id,
      Nom_prenom: candidat.nomPrenom,
      URL_CV: cvUrl,
      Age: candidat.telephone
    },
    attachment
  }).catch(err => {
    error(`Error while sending candidature email with SendInBlue - ${err.response.text}`)
    throw err
  })
  debug(`Candidature sent: response is ${JSON.stringify(messageResponse)}`)
}

function destinataireIsPoleEmploi ({ contact }) {
  return contact.courriel.includes('@pole-emploi.')
}

function normalizeRemoveDiacretics (s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const poleEmploiTemplateId = 53
const defaultTemplateId = 52
const PNSMPattachment = { url: 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' }
