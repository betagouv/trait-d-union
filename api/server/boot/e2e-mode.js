const poleEmploiApiMock = require('../../tests/pole-emploi-api-mock')
const sendinblueApiMock = require('../../tests/sendinblue-api-mock')

module.exports = () => {
  if (process.env.NODE_ENV === 'e2e') {
    console.log('E2E mode activated!')
    poleEmploiApiMock.set()
    sendinblueApiMock.set()
  }
}
