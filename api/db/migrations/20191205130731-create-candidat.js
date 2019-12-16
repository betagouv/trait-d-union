const niveauxEtude = require('../../src/models/enums/niveaux-etude')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidats', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activationKey: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resetPasswordKey: {
        type: Sequelize.STRING,
        allowNull: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      niveauEtude: {
        type: Sequelize.ENUM(niveauxEtude),
        validate: { isIn: [niveauxEtude] },
        allowNull: true
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      poleEmploiId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      otherJobs: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acceptFollowingTraining: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('candidats')
  }
}
