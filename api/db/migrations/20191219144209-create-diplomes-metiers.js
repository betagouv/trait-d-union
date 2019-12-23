module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('diplomes-metiers', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      codeDiplome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codeROME: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('diplomes-metiers')
  }
}
