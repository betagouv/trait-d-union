const { expect, sinon } = require('../../../tests/test-utils')
const blacklistOffres = require('./blacklist-offres')

describe('Blacklist offres', () => {
  const BlacklistedOffre = {
    find: sinon.spy(async () => [{ id: 'blacklisted-offre-id' }])
  }
  const BlacklistedContact = {
    find: sinon.spy(async () => [{ email: 'blacklisted-email' }])
  }
  const Offre = {
    find: sinon.spy(async () => [
      { id: 'valid-offre' },
      { id: 'blacklisted-offre', data: { contact: { courriel: 'blacklisted-email' } } }
    ]),
    updateAll: sinon.spy()
  }
  it('retrieves all offres id to blacklist', async () => {
    await blacklistOffres({ Offre, BlacklistedOffre, BlacklistedContact })

    expect(BlacklistedOffre.find).to.have.been.calledWith()
  })
  it('updates offres status to blacklisted for offres included in blacklisted offres', async () => {
    await blacklistOffres({ Offre, BlacklistedOffre, BlacklistedContact })

    expect(Offre.updateAll).to.have.been.calledWith({
      id: { inq: ['blacklisted-offre-id'] }
    }, {
      status: 'blacklisted'
    })
  })
  it('retrieves all contacts to blacklist', async () => {
    await blacklistOffres({ Offre, BlacklistedOffre, BlacklistedContact })

    expect(BlacklistedContact.find).to.have.been.calledWith()
  })
  it('updates offres status to blacklisted for offres with email in blacklisted emails', async () => {
    await blacklistOffres({ Offre, BlacklistedOffre, BlacklistedContact })

    expect(Offre.updateAll).to.have.been.calledWith({
      'data.contact.courriel': { inq: ['blacklisted-email'] }
    }, {
      status: 'blacklisted'
    })
  })
})
