const { debug } = require('../../infrastructure/logger')

module.exports = ({ now, delays, sendCandidatureEmail, isMessageOpened }) => {
  const sendRetryCandidatureEmail = createSendRetryCandidatureEmail(sendCandidatureEmail)
  const updateMessageStatus = createUpdateMessageStatus(isMessageOpened)

  return async ({ Candidature }) => {
    async function getCandidaturesToRetry () {
      const minimumDelayBeforeNow = now() - delays.minimumDays * millisecondsPerDay
      const maximumDelaysBeforeNow = now() - delays.maximumDays * millisecondsPerDay
      debug(`Will retry candidatures sent between ${maximumDelaysBeforeNow} and ${minimumDelayBeforeNow}`)

      return Candidature.find({
        where: {
          createdAt: {
            between: [maximumDelaysBeforeNow, minimumDelayBeforeNow]
          },
          status: {
            inq: [null, 'sent']
          }
        },
        include: ['offre', 'candidat']
      })
    }

    const candidaturesToRetry = await getCandidaturesToRetry()

    debug(`${candidaturesToRetry.length} candidature found`)
    candidaturesToRetry.map(candidature => debug(`candidature.id: ${candidature.id} - candidat: ${JSON.stringify(candidature.candidat())}`))

    const candidatures = await Promise.all(candidaturesToRetry.map(updateMessageStatus))
    const nonOpenedCandidatures = candidatures.filter(({ status }) => status === 'sent')
    const retriedCandidatures = await Promise.all(nonOpenedCandidatures.map(sendRetryCandidatureEmail))
    return Promise.all(retriedCandidatures.map(updateStatus))
  }
}

function createSendRetryCandidatureEmail (sendCandidatureEmail) {
  return async (candidature) => {
    const offre = candidature.offre().data
    const candidat = candidature.candidat()
    debug(`Will send a retry email for offre ${offre.id} from candidat ${candidat.id}`)
    await sendCandidatureEmail({ offre: offre, candidat: candidat, candidatureId: candidature.id, retry: true })
    return candidature
  }
}

function createUpdateMessageStatus (isMessageOpened) {
  return async candidature => {
    const offre = candidature.offre().data
    const isOpened = await isMessageOpened({ messageId: candidature.messageId, email: offre.contact.courriel })
    candidature.status = isOpened ? 'opened' : 'sent'
    await candidature.updateAttribute('status', isOpened ? 'opened' : 'sent')
    return candidature
  }
}

async function updateStatus (candidature) {
  return candidature.updateAttribute('status', 'retried')
}

const millisecondsPerDay = 24 * 3600 * 1000
