const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')
const niveauxEtude = require('./enums/niveaux-etude')

const Diplome = databaseService.define('diplome', {
  codeDiplome: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  intitule: {
    type: Sequelize.STRING,
    allowNull: false
  },
  niveauEtudeEntree: {
    type: Sequelize.ENUM(niveauxEtude),
    allowNull: false,
    validate: { isIn: [niveauxEtude] }
  },
  commune: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Diplome
