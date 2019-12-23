const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')

const Metier = databaseService.define('Metier', {
  codeROME: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  categorie: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Metier.associate = ({ Offre }) => {
  Metier.hasMany(Offre, { foreignKey: 'codeROME' })
}

module.exports = Metier
