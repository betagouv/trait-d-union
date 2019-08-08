const nock = require('nock')
const sendinblueApi = nock('https://api.sendinblue.com/v3')

exports.set = () => {
  sendinblueApi
    .post('/contacts', {
      email: 'an_account@example.com',
      attributes: {
        SMS: 'Lorem ipsum dolor Phone',
        NOM_COMPLET: 'Lorem ipsum dolor Nom Prenom',
        URL_CV: 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'
      },
      listIds: [23, 24]
    })
    .matchHeader('content-type', 'application/json')
    .matchHeader('api-key', 'sendinblueApiKey')
    .reply(200)
    .persist()

  sendinblueApi
    .post('/smtp/email')
    .matchHeader('content-type', 'application/json')
    .matchHeader('api-key', 'sendinblueApiKey')
    .reply(200)
    .persist()
}
