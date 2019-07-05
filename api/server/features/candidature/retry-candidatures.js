const { debug } = require('../../infrastructure/logger')

module.exports = ({ now, delays, sendCandidatureEmail, isMessageOpened }) => async ({ Candidature }) => {
  const minimumDelayBeforeNow = now - delays.minimumDays * millisecondsPerDay
  const maximumDelaysBeforeNow = now - delays.maximumDays * millisecondsPerDay
  debug(`Will retry candidatures sent between ${maximumDelaysBeforeNow} and ${minimumDelayBeforeNow}`)
  const candidaturesToRetry = await Candidature.find({
    where: {
      updatedAt: {
        between: [maximumDelaysBeforeNow, minimumDelayBeforeNow]
      },
      status: {
        inq: [null, 'sent']
      }
    },
    include: ['offre', 'candidat']
  })

  debug(`${candidaturesToRetry.length} candidature found`)
  return Promise.all(candidaturesToRetry
    .filter(async candidature => {
      const offre = candidature.offre().data
      return isMessageOpened({ messageId: candidature.messageId, email: offre.contact.courriel })
    })
    .map((candidature) => {
      const offre = candidature.offre().data
      const candidat = candidature.candidat()
      debug(`Will send a retry email for offre ${offre.id} from candidat ${candidat.id}`)
      return sendCandidatureEmail({ offre: offre, candidat: candidat, candidatureId: candidature.id, retry: true })
    }))
}

const millisecondsPerDay = 24 * 3600 * 1000
