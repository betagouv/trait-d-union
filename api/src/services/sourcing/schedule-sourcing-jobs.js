const schedule = require('node-schedule')
const logger = require('../../utils/logger')
const models = require('../../models')
const sourceOffres = require('../../services/sourcing/source-offres')(models)

const departements = [{
  inseeCode: '54',
  scheduleTime: {
    hour: 8,
    minute: 22,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '57',
  scheduleTime: {
    hour: 0,
    minute: 10,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '08',
  scheduleTime: {
    hour: 0,
    minute: 20,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '51',
  scheduleTime: {
    hour: 0,
    minute: 30,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '67',
  scheduleTime: {
    hour: 0,
    minute: 40,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '68',
  scheduleTime: {
    hour: 0,
    minute: 50,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '88',
  scheduleTime: {
    hour: 1,
    minute: 0,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '10',
  scheduleTime: {
    hour: 1,
    minute: 10,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '52',
  scheduleTime: {
    hour: 1,
    minute: 20,
    tz: 'Europe/Paris'
  }
}, {
  inseeCode: '55',
  scheduleTime: {
    hour: 1,
    minute: 30,
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
