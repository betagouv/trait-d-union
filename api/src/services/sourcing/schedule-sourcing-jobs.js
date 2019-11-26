const schedule = require('node-schedule')
const logger = require('../../utils/logger')
const models = require('../../models')
const sourceOffres = require('../../services/sourcing/source-offres')(models)

const departements = [{
  inseeCode: '54',
  scheduleTime: {
    hour: 0,
    minute: 36,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '57',
  scheduleTime: {
    hour: 0,
    minute: 46,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '08',
  scheduleTime: {
    hour: 0,
    minute: 56,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '51',
  scheduleTime: {
    hour: 1,
    minute: 6,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '67',
  scheduleTime: {
    hour: 1,
    minute: 16,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '68',
  scheduleTime: {
    hour: 1,
    minute: 26,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '88',
  scheduleTime: {
    hour: 1,
    minute: 36,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '10',
  scheduleTime: {
    hour: 1,
    minute: 46,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '52',
  scheduleTime: {
    hour: 1,
    minute: 56,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '55',
  scheduleTime: {
    hour: 2,
    minute: 6,
    tz: 'Europe/Paris'
  }
}]

module.exports = (app) => {
  departements.forEach(departement => {
    logger().debug(`Schedule a sourcing job for departement ${departement.inseeCode} at ${JSON.stringify(departement.scheduleTime)}`)
    const job = schedule.scheduleJob(departement.scheduleTime, async () => {
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
