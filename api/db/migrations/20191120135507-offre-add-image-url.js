module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'offres',
      'imageURL', {
        type: Sequelize.STRING,
        allowNull: true
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('offres', 'imageURL')
  }
}
