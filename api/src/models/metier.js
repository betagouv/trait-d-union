const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')

const Metier = databaseService.define('Metier', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  codeROME: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categorie: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Metier
