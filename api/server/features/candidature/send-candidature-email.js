const { error } = require('../../infrastructure/logger')
const { DateTime } = require('luxon')

module.exports = ({ smtpApiClient }) => async ({ offre, candidat, candidatureId, retry = false }) => {
  const cvUrl = normalizeRemoveDiacretics(candidat.cvUrl)
  const templateId = computeTemplateId({ destinataire: destinataire(offre), retry })
  const attachment = destinataireIsPoleEmploi(offre) ? [PNSMPattachment, { url: cvUrl }] : [PNSMPattachment]
  const tag = retry ? 'Relance_Candidature_DE' : 'Candidature_DE'
  const tags = [`${tag}${process.env.APP_ENV === 'staging' ? '_Staging' : ''}`]
  const { messageId } = await smtpApiClient.sendTransacEmail({
    templateId,
    to: [{ name: offre.contact.nom, email: offre.contact.courriel }],
    replyTo: { name: candidat.nomPrenom, email: candidat.email },
    params: {
      Titre_offre: offre.intitule,
      id_offre: offre.id,
      Nom_prenom: candidat.nomPrenom,
      URL_CV: cvUrl,
      Age: candidat.age,
      Telephone: candidat.telephone,
      id_candidature: candidatureId,
      email_candidat: candidat.email,
      poleEmploiId: candidat.poleEmploiId,
      sessionDateDebut: formatDate(offre.sessions[0].dateDebut),
      sessionDateFin: formatDate(offre.sessions[0].dateFin),
      sessionDuree: offre.sessions[0].duration
    },
    attachment,
    tags
  }).catch(err => {
    error(`Error while sending candidature email with SendInBlue - ${err.response ? err.response.text : err}`)
    throw err
  })
  return messageId
}

function destinataireIsPoleEmploi ({ contact }) {
  return contact.courriel.includes('@pole-emploi.')
}

function destinataire ({ contact }) {
  return destinataireIsPoleEmploi({ contact }) ? 'pole-emploi' : 'corporate'
}

function normalizeRemoveDiacretics (s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function computeTemplateId ({ destinataire, retry }) {
  return templateIds[destinataire][retry ? 'retry' : 'first']
}

const templateIds = {
  'pole-emploi': {
    first: 53,
    retry: 63
  },
  'corporate': {
    first: 52,
    retry: 62
  }
}
const PNSMPattachment = { url: 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' }

function formatDate (date) {
  const dateTime = DateTime.fromISO(date)
  return dateTime.setLocale('fr').toLocaleString(DateTime.DATE_FULL)
}
