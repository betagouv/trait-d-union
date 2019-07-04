const schedule = require('node-schedule')
const { info } = require('../infrastructure/logger')
const sourceOffres = require('../features/offres/source-offres')

module.exports = (app) => {
  app.scheduledSourceTask = schedule.scheduleJob(everyDayAtMidnight, () => {
    info('Time to source offres for the day !')
    sourceOffres(app.models)
  })
}

const everyDayAtMidnight = new schedule.RecurrenceRule()
everyDayAtMidnight.hour = 0
everyDayAtMidnight.minute = 0
