const { info, error } = require('../../infrastructure/logger')
const sendSlackNotification = require('../../infrastructure/send-slack-notification')
const { smtpApiClient } = require('../../infrastructure/sendinblue-api-client')

const sendCandidatureEmail = require('./send-candidature-email')({ smtpApiClient })
const sendAccuseCandidatureEmail = require('./send-accuse-candidature-email')({ smtpApiClient })

module.exports = async ({ Candidat, Offre }, offreId, candidatId) => {
  const offreFromDB = await Offre.findById(offreId)
  const candidat = await Candidat.findById(candidatId)

  if (offreFromDB) {
    const candidature = await offreFromDB.candidatures.add(candidatId)
    const offre = offreFromDB.data
    const messageId = await sendCandidatureEmail({ offre, candidat, candidatureId: candidature.id })
      .catch(async (err) => {
        error(`Error while sending candidature email for candidat ${candidatId} and offre ${offreId} - ${err}`)
        await notifyCandidatureFailure({ sendSlackNotification }, { candidat, offre, err })
        throw err
      })
    info('Candidature successfully sent!')
    await notifyCandidatureSuccess({ sendSlackNotification }, { candidat, offre })
    await sendAccuseCandidatureEmail({ offre, candidat })
    await candidature.updateAttributes({ status: 'sent', messageId })
  } else {
    info('No offre found - notifying it to Slack and exiting')
    await notifyCandidatureFailure({ sendSlackNotification }, {
      candidat,
      offre: { id: offreId },
      error: 'Aucune offre correspondante'
    })
  }
}

function notifyCandidatureFailure ({ sendSlackNotification }, { candidat, offre, err }) {
  return sendSlackNotification({
    text: `:face_with_symbols_on_mouth: L'email de candidature de ${candidat.nomPrenom} ` +
      `pour l'offre ${offre.intitule || offre.id} n'a pu être envoyé\nErreur: ${err}`
  })
}

function notifyCandidatureSuccess ({ sendSlackNotification }, { candidat, offre }) {
  return sendSlackNotification({
    text: `:heart: Nouvelle candidature envoyée par ${candidat.nomPrenom} ` +
      `pour l'offre ${offre.intitule || offre.id}`
  })
}
