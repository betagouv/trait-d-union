const databaseService = require('../config/database-service')
const wait = require('../../src/infrastructure/wait')(10)
const executePromisesSequentially = require('../../src/infrastructure/execute-promise-sequentially')(wait)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    databaseService.configure(queryInterface)
    const { Candidature, Candidat } = require('../../src/models')
    const [oldCandidatures] = await queryInterface.sequelize.query(
      'SELECT * FROM "old-candidatures"'
    )

    oldCandidatures.map(createUpdateFunction(Candidature, Candidat, queryInterface))

    return executePromisesSequentially(oldCandidatures, createUpdateFunction)
  },

  down: async (queryInterface, Sequelize) => {
  }
}

function createUpdateFunction (Candidature, Candidat, queryInterface) {
  return async (oldCandidature) => {
    const { id } = await Candidature.findOne({
      attributes: ['id'],
      where: { offreId: oldCandidature.offreId },
      include: [
        {
          require: true,
          model: Candidat,
          attributes: ['id'],
          where: { email: oldCandidature.email }
        }
      ]
    })
    console.log(`Updating candidatures createdAt - ${id} - ${oldCandidature.createdAt}`)
    return queryInterface.sequelize.query(
      'UPDATE "candidatures" SET "createdAt" = :createdAt WHERE "id" = :id',
      {
        replacements: {
          id,
          createdAt: oldCandidature.createdAt
        }
      }
    )
  }
}
