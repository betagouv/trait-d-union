module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('candidats', 'candidatures')
    await queryInterface.changeColumn('candidatures', 'email',
      {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false
      })
    return queryInterface.addColumn('candidatures', 'offreId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'offres',
          unique: false,
          key: 'id'
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('candidatures', 'candidats')
    await queryInterface.changeColumn('candidats', 'email',
      {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      })
    return queryInterface.removeColumn('candidats', 'offreId')
  }
}
