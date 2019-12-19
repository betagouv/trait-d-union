const niveauxEtude = require('../../src/models/enums/niveaux-etude')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('diplomes', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('diplomes')
  }
}
