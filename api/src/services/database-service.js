const Sequelize = require('sequelize')
const configurationService = require('./configuration-service')
const logger = require('../utils/logger')

const sequelize = new Sequelize(configurationService.get('DATABASE_URL'), { logging: _logging })

module.exports = sequelize

function _logging (msg) {
  logger().info(msg)
}
