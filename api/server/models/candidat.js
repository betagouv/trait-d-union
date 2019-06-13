const createCandidatFromFormResponse = require('../features/candidats/create-candidat-from-form-response')

module.exports = function (Candidat) {
  Candidat.formResponse = async (data) => {
    return createCandidatFromFormResponse({ Candidat }, data)
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
