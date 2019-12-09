'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('candidatures', 'old-candidatures')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameTable('old-candidatures', 'candidatures')
  }
}
