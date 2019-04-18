const poleEmploiApiMock = require('../../tests/pole-emploi-api-mock')

module.exports = () => {
  if (process.env.NODE_ENV === 'e2e') {
    poleEmploiApiMock.set()
  }
}
