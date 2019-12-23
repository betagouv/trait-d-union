const databaseService = require('../config/database-service')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DELETE FROM diplomes;')
    databaseService.configure(queryInterface)
    const { DiplomesMetiers, Diplome } = require('../../src/models')
    const diplomes = require('../../features/diplomes/diplomes.json')
    return queryInterface.sequelize.transaction(transaction => {
      const promises = diplomes.map(async (diplome) => {
        const codesROME = [...diplome.codesROME]
        delete diplome.codesROME
        await Diplome.create(diplome, { transaction })
        const relations = codesROME.map(async codeROME => {
          return DiplomesMetiers.create({
            codeROME,
            codeDiplome: diplome.codeDiplome
          }, { transaction })
        })
        return Promise.all(relations)
      })
      return Promise.all(promises)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.query('DELETE FROM diplomes;')
  }
}
