const schedule = require('node-schedule')
const logger = require('../../utils/logger')
const models = require('../../models')
const sourceOffres = require('../../services/sourcing/source-offres')(models)

const departements = [
  { inseeCode: '54' },
  { inseeCode: '57' },
  { inseeCode: '08' },
  { inseeCode: '51' },
  { inseeCode: '67' },
  { inseeCode: '68' },
  { inseeCode: '88' },
  { inseeCode: '10' },
  { inseeCode: '52' },
  { inseeCode: '55' }
]

module.exports = (app) => {
  departements.forEach((departement, index) => {
    const scheduleTime = computeScheduleTime(index)
    logger().debug(`Schedule a sourcing job for departement ${departement.inseeCode} at ${JSON.stringify(scheduleTime)}`)
    const job = schedule.scheduleJob(scheduleTime, async () => {
      logger().info(`${departement.inseeCode} - Time to source offres for the day !`)
      try {
        sourceOffres(departement.inseeCode)
      } catch (err) {
        logger().error(`${departement.inseeCode} - Sourcing offres failed with error: ${err}`)
      }
    })
    logger().debug(`Next invocation for departement ${departement.inseeCode} is ${job.nextInvocation()}`)
  })
}

function computeScheduleTime (index) {
  const invocationIntervalInMinutes = 15
  const hour = Math.floor((index * invocationIntervalInMinutes) / 60)
  const minute = (index * invocationIntervalInMinutes) % 60
  return {
    hour,
    minute,
    tz: 'Europe/Paris'
  }
}
