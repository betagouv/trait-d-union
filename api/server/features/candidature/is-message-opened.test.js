const { expect, sinon } = require('../../../tests/test-utils')
const isMessageOpened = require('./is-message-opened')

describe('is Message delivered', () => {
  const messageId = 'messageId'
  const email = 'email@mail.fr'
  let smtpApiClient

  beforeEach(() => {
    smtpApiClient = {
      getTransacEmailsList: sinon.spy(async () => ({
        transactionalEmails: [{ uuid: 'uuid' }]
      })),
      getTransacEmailContent: sinon.spy(async () => ({
        events: [
          {
            'name': 'opened',
            'time': '2019-07-03T12:23:24.932+02:00'
          },
          {
            'name': 'sent',
            'time': '2019-07-03T12:23:22.877+02:00'
          }
        ]
      }))
    }
  })
  it('retrieves message uuid', async () => {
    await isMessageOpened({ smtpApiClient })({ messageId, email })

    expect(smtpApiClient.getTransacEmailsList).to.be.calledWith({ messageId, email })
  })
  it('retrieves message events', async () => {
    await isMessageOpened({ smtpApiClient })({ messageId, email })

    expect(smtpApiClient.getTransacEmailContent).to.be.calledWith('uuid')
  })
  context('when message contains a opened event', () => {
    it('returns true', async () => {
      const isDelivered = await isMessageOpened({ smtpApiClient })({ messageId, email })
      expect(isDelivered).to.be.true()
    })
  })
  context('when message does not contain a opened event', () => {
    beforeEach(() => {
      smtpApiClient.getTransacEmailContent = sinon.spy(async () => ({
        events: []
      }))
    })
    it('returns false', async () => {
      const isDelivered = await isMessageOpened({ smtpApiClient })({ messageId, email })
      expect(isDelivered).to.be.false()
    })
  })
})
