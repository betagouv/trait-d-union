const schedule = require('node-schedule')
const { error, info } = require('../infrastructure/logger')
const sourceOffres = require('../features/offres/source-offres')

module.exports = (app) => {
  app.scheduledSourceTask = schedule.scheduleJob(everyDayAtMidnight, async () => {
    info('Time to source offres for the day !')
    try {
      sourceOffres(app.models)
    } catch (err) {
      error(`Sourcing offres failed with error: ${err}`)
      sourceOffres(app.models)
    }
  })
}

const everyDayAtMidnight = new schedule.RecurrenceRule()
everyDayAtMidnight.hour = 0
everyDayAtMidnight.minute = 0
