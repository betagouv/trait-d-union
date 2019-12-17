const databaseService = require('../config/database-service')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    databaseService.configure(queryInterface)
    const { Candidature, Candidat } = require('../../src/models')
    const [oldCandidatures] = await queryInterface.sequelize.query(
      'SELECT * FROM "old-candidatures"'
    )

    const promises = oldCandidatures.map(async (oldCandidature) => {
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
      return queryInterface.sequelize.query(
        'UPDATE "candidatures" SET "createdAt" = :createdAt WHERE "id" = :id',
        {
          replacements: {
            id,
            createdAt: oldCandidature.createdAt
          }
        }
      )
    })

    return Promise.all(promises)
  },

  down: async (queryInterface, Sequelize) => {}
}
