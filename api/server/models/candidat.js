const { contactsApiClient, smtpApiClient } = require('../infrastructure/sendinblue-api-client')
const sendSlackNotification = require('../infrastructure/send-slack-notification')
const { info, debug, error } = require('../infrastructure/logger')

const createCandidatFromFormResponse = require('../features/candidats/create-candidat-from-form-response')
const subscribeCandidateToMailingContactLists = require('../features/candidats/subscribe-candidate-to-mailing-contact-lists')
const sendCandidatureEmail = require('../features/candidats/send-candidature-email')
module.exports = function (Candidat) {
  Candidat.formResponse = async (data) => {
    info(`New candidature received from Typeform`)
    const candidat = await createCandidatFromFormResponse({ Candidat }, data)
    debug(`Created candidat: ${candidat.id}`)
    await subscribeCandidateToMailingContactLists({ contactsApiClient }, candidat)
    debug(`Candidat added to SendInBlue contacts: ${candidat.id}`)
    const offreId = data.hidden.id_offre
    const offreFromDB = await Candidat.app.models.Offre.findById(offreId)
    if (offreFromDB) {
      offreFromDB.candidatures.add(candidat.id)
      const offre = offreFromDB.data
      await sendCandidatureEmail({ smtpApiClient }, { offre, candidat })
        .catch(err => {
          error(err)
          notifyCandidatureFailure({ sendSlackNotification }, { candidat, offre, err })
          throw err
        })
      info('Candidature successfully sent!')
      notifyCandidatureSuccess({ sendSlackNotification }, { candidat, offre })
    } else {
      debug('No offre found - notifying it to Slack and exiting')
      notifyCandidatureFailure({ sendSlackNotification }, {
        candidat,
        offre: { id: offreId },
        error: 'Aucune offre correspondante'
      })
    }
    return candidat
  }

  Candidat.remoteMethod('formResponse', {
    http: { path: '/form-response', verb: 'POST' },
    accepts: { arg: 'form_response', type: 'object' },
    returns: { arg: 'candidat', type: 'string', root: true }
  })

  Candidat.afterRemote('formResponse', async (context) => {
    context.res.statusCode = 201
  })
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
