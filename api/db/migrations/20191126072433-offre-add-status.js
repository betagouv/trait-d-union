const offreStatuses = require('../../src/models/enums/offre-statuses')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'offres',
      'status', {
        type: Sequelize.ENUM(offreStatuses),
        allowNull: true,
        defaultValue: offreStatuses[0]
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('offres', 'status')
  }
}
