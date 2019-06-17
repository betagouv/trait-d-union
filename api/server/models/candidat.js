const { contactsApiClient, smtpApiClient } = require('../infrastructure/sendinblue-api-client')
const sendSlackNotification = require('../infrastructure/send-slack-notification')
const { error } = require('../infrastructure/logger')

const createCandidatFromFormResponse = require('../features/candidats/create-candidat-from-form-response')
const subscribeCandidateToMailingContactLists = require('../features/candidats/subscribe-candidate-to-mailing-contact-lists')
const sendCandidatureEmail = require('../features/candidats/send-candidature-email')

module.exports = function (Candidat) {
  Candidat.formResponse = async (data) => {
    const candidat = await createCandidatFromFormResponse({ Candidat }, data)
    await subscribeCandidateToMailingContactLists({ contactsApiClient }, candidat)
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
      notifyCandidatureSuccess({ sendSlackNotification }, { candidat, offre })
    } else {
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
