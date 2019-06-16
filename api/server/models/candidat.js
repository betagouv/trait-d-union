const { contactsApiClient, smtpApiClient } = require('../infrastructure/sendinblue-api-client')
const { error } = require('../infrastructure/logger')
const createCandidatFromFormResponse = require('../features/candidats/create-candidat-from-form-response')
const subscribeCandidateToMailingContactLists = require('../features/candidats/subscribe-candidate-to-mailing-contact-lists')
const sendCandidatureEmail = require('../features/candidats/send-candidature-email')

module.exports = function (Candidat) {
  Candidat.formResponse = async (data) => {
    const candidat = await createCandidatFromFormResponse({ Candidat }, data)
    await subscribeCandidateToMailingContactLists({ contactsApiClient }, candidat)
    const offreId = data.hidden.id_offre
    if (offreId) {
      await sendCandidatureEmail({ smtpApiClient, Offre: Candidat.app.models.Offre }, offreId, candidat)
        .catch(err => {
          error(err)
          throw err
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
