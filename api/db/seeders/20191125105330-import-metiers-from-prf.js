module.exports = {
  up: (queryInterface, Sequelize) => {
    const metiersFromPRF = require('../../features/metiers/GET_metiers.json')
    return queryInterface.bulkInsert('Metiers', metiersFromPRF, {})
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('metiers', null, {})
}
