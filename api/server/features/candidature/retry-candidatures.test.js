const { expect, sinon } = require('../../../tests/test-utils')
const clock = { now: () => 0 }
const configuration = {
  minimumDays: 7,
  maximumDays: 10
}
const sendCandidatureEmail = sinon.spy(async () => ({}))
const isMessageOpened = sinon.spy(async (messageId) => messageId === 'opened-message')
const retryCandidatures = require('./retry-candidatures')({
  isMessageOpened,
  sendCandidatureEmail,
  now: clock.now(),
  delays: configuration
})
const millisecondsPerDay = 24 * 3600 * 1000

describe('Retry Candidatures', () => {
  const tenDaysBeforeNow = -10 * millisecondsPerDay
  const sevenDaysBeforeNow = -7 * millisecondsPerDay

  const openedCandidature = {
    id: 'opened-candidature-id',
    messageId: 'opened-message',
    offre: () => ({ data: { id: 'offre-id-opened', contact: { courriel: 'mail@domain.fr' } } }),
    candidat: () => ({ id: 'candidat-id-opened' })
  }
  const nonOpenedCandidature = {
    id: 'non-opened-candidature-id',
    messageId: 'non-opened-message',
    offre: () => ({ data: { id: 'offre-id-non-opened', contact: { courriel: 'mail@domain.fr' } } }),
    candidat: () => ({ id: 'candidat-id-non-opened' })
  }
  const Candidature = {
    find: sinon.spy(async () => [
      openedCandidature,
      nonOpenedCandidature
    ])
  }

  it('retrieves candidatures sent or without any status and sent more than a week ago', async () => {
    await retryCandidatures({ Candidature })

    expect(Candidature.find).to.be.calledWith({
      where: {
        updatedAt: {
          between: [tenDaysBeforeNow, sevenDaysBeforeNow]
        },
        status: {
          inq: [null, 'sent']
        }
      },
      include: ['offre', 'candidat']
    })
  })

  it('retrieves delivery status of each candidature', async () => {
    await retryCandidatures({ Candidature })

    expect(isMessageOpened).to.have.been.calledWith({ messageId: 'opened-message', email: 'mail@domain.fr' })
    expect(isMessageOpened).to.have.been.calledWith({ messageId: 'non-opened-message', email: 'mail@domain.fr' })
  })

  it('sends a retry email candidature to each candidature not opened', async () => {
    await retryCandidatures({ Candidature })

    expect(sendCandidatureEmail).to.have.been.calledWith({
      offre: { id: 'offre-id-non-opened', contact: { courriel: 'mail@domain.fr' } },
      candidat: { id: 'candidat-id-non-opened' },
      candidatureId: 'non-opened-candidature-id',
      retry: true
    })
  })
})
