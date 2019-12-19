const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')

const DiplomeMetier = databaseService.define('diplomes-metiers', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  codeROME: {
    type: Sequelize.STRING,
    allowNull: false
  },
  codeDiplome: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'diplomes-metiers'
})

DiplomeMetier.associate = ({ DiplomesMetiers, Diplome, Metier }) => {
  Diplome.belongsToMany(Metier, {
    through: { model: DiplomesMetiers },
    foreignKey: 'codeDiplome'
  })
  Metier.belongsToMany(Diplome, {
    through: { model: DiplomesMetiers },
    foreignKey: 'codeROME'
  })
}

module.exports = DiplomeMetier
