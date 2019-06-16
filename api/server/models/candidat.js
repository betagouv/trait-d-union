const sendinblueApiClient = require('../infrastructure/sendinblue-api-client')
const createCandidatFromFormResponse = require('../features/candidats/create-candidat-from-form-response')
const subscribeCandidateToMailingContactLists = require('../features/candidats/subscribe-candidate-to-mailing-contact-lists')

module.exports = function (Candidat) {
  Candidat.formResponse = async (data) => {
    const candidat = await createCandidatFromFormResponse({ Candidat }, data)
    await subscribeCandidateToMailingContactLists({ sendinblueApiClient }, candidat)
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
