const Sequelize = require('sequelize')
const configurationService = require('./configuration-service')
const logger = require('../utils/logger')

const databaseUrl = configurationService.get('E2E_TEST')
  ? configurationService.get('E2E_TEST_DATABASE_URL')
  : configurationService.get('DATABASE_URL')

const sequelize = new Sequelize(databaseUrl, {
  benchmark: true,
  logging: _logging
})
module.exports = sequelize

function _logging (msg) {
  logger().info(msg)
}
