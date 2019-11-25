const schedule = require('node-schedule')
const logger = require('../../utils/logger')
const models = require('../../models')
const sourceOffres = require('../../services/sourcing/source-offres')(models)

const departements = [{
  inseeCode: '54',
  scheduleTime: '1 0 * * *'
}, {
  inseeCode: '57',
  scheduleTime: '15 0 * * *'
}, {
  inseeCode: '08',
  scheduleTime: '30 0 * * *'
}, {
  inseeCode: '51',
  scheduleTime: '45 0 * * *'
}, {
  inseeCode: '67',
  scheduleTime: '1 1 * * *'
}, {
  inseeCode: '68',
  scheduleTime: '15 1 * * *'
}, {
  inseeCode: '88',
  scheduleTime: '30 1 * * *'
}, {
  inseeCode: '10',
  scheduleTime: '45 1 * * *'
}, {
  inseeCode: '52',
  scheduleTime: '1 2 * * *'
}, {
  inseeCode: '55',
  scheduleTime: '15 2 * * *'
}]

module.exports = (app) => {
  departements.forEach(departement => {
    logger().debug(`Schedule a sourcing job for departement ${departement.inseeCode} at ${departement.scheduleTime}`)
    schedule.scheduleJob(departement.scheduleTime, async () => {
      logger().info(`${departement.inseeCode} - Time to source offres for the day !`)
      try {
        sourceOffres(departement.inseeCode)
      } catch (err) {
        logger().error(`${departement.inseeCode} - Sourcing offres failed with error: ${err}`)
      }
    })
  })
}
