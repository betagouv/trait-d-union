const { expect, sinon } = require('../../../tests/test-utils')
const retrieveCandidatureFromMessageId = require('./retrieve-candidature-from-message-id')

describe('Retrieve candidature from message Id', () => {
  const Candidature = {
    findOne: sinon.spy(async () => ({ id: 'candidature-id' }))
  }

  it('searches in DB', async () => {
    await retrieveCandidatureFromMessageId({ Candidature }, 'messageId')

    expect(Candidature.findOne).to.have.been.calledWith({
      where: { messageId: 'messageId' },
      include: ['candidat', 'offre']
    })
  })

  it('returns found candidature', async () => {
    const candidatureFound = await retrieveCandidatureFromMessageId({ Candidature }, 'messageId')

    expect(candidatureFound).to.eql({ id: 'candidature-id' })
  })

  context('when no candidature found', () => {
    it('returns null', async () => {
      const Candidature = {
        findOne: async () => undefined
      }
      const candidatureFound = await retrieveCandidatureFromMessageId({ Candidature }, 'messageId')

      expect(candidatureFound).to.be.null()
    })
  })
})
