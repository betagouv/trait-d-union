const schedule = require('node-schedule')
const { info } = require('../infrastructure/logger')
const sourceOffres = require('../features/offres/source-offres')

module.exports = async (app) => {
  schedule.scheduleJob(everyDayAtMidnight, function () {
    info('Time to source offres for the day !')
    sourceOffres(app.models)
  }, {
    scheduled: true,
    timezone: 'Europe/Paris'
  })
}

const everyDayAtMidnight = new schedule.RecurrenceRule()
everyDayAtMidnight.hour = 0
everyDayAtMidnight.minute = 0
