const schedule = require('node-schedule')
const { info } = require('../infrastructure/logger')
const now = require('../infrastructure/clock').now()
const delays = require('../infrastructure/retry-candidatures-configuration')
const { smtpApiClient } = require('../infrastructure/sendinblue-api-client')
const isMessageOpened = require('../features/candidature/is-message-opened')({ smtpApiClient })
const sendCandidatureEmail = require('../features/candidature/send-candidature-email')({ smtpApiClient })
const retryCandidatures = require('../features/candidature/retry-candidatures')({ now, delays, isMessageOpened, sendCandidatureEmail })

module.exports = (app) => {
  app.scheduleRetryCandidatureTask = schedule.scheduleJob(everyWorkingDayAtNineAM, () => {
    info('Time to retry candidatures email!')
    return retryCandidatures(app.models)
  })
}

const everyWorkingDayAtNineAM = new schedule.RecurrenceRule()
everyWorkingDayAtNineAM.hour = 9
everyWorkingDayAtNineAM.minute = 0
everyWorkingDayAtNineAM.dayOfWeek = [1, 2, 3, 4, 5]
