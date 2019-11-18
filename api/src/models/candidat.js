const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')

const Candidat = databaseService.define('candidat', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  niveauEtude: {
    type: Sequelize.ENUM(['bac']),
    validate: { isIn: ['bac'] },
    defaultValue: 'bac'
  }
})
module.exports = Candidat
