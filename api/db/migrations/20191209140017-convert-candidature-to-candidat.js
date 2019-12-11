const { promisify } = require('util')
const databaseService = require('../config/database-service')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    databaseService.configure(queryInterface)
    const { Candidat } = require('../../src/models')
    const registerUser = promisify(Candidat.register)

    const [rawOldCandidatures] = await queryInterface.sequelize.query('SELECT * FROM "old-candidatures"')

    if (rawOldCandidatures.length === 0) {
      return
    }

    const oldCandidatures = uniqBy(rawOldCandidatures, 'email')
    await Promise.all(oldCandidatures.map(createCandidat(Candidat, registerUser)))

    await createCandidatureTable(queryInterface, Sequelize)

    const createCandidaturesPromises = rawOldCandidatures.map(async candidature => {
      const candidat = await Candidat.findOne({ where: { email: candidature.email } })
      return candidat.addOffre(candidature.offreId)
    })
    return Promise.all(createCandidaturesPromises)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('candidatures')
    return queryInterface.sequelize.query('DELETE FROM "candidats"')
  }
}

function uniqBy (a, key) {
  const seen = {}
  return a.filter(function (item) {
    const k = item[key]
    // eslint-disable-next-line no-prototype-builtins
    return seen.hasOwnProperty(k) ? false : (seen[k] = true)
  })
}

function createCandidatureTable (queryInterface, Sequelize) {
  return queryInterface.createTable('candidatures', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    offreId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'offres',
        unique: false,
        key: 'id'
      }
    },
    candidatId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'candidats',
        unique: false,
        key: 'id'
      }
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
}

function createCandidat (Candidat, registerUser) {
  return candidature => {
    const candidat = new Candidat({
      id: candidature.id,
      firstName: candidature.firstName,
      lastName: candidature.lastName,
      email: candidature.email,
      niveauEtude: candidature.niveauEtude,
      zipCode: candidature.zipCode,
      poleEmploiId: candidature.poleEmploiId,
      phoneNumber: candidature.phoneNumber,
      age: candidature.age,
      otherJobs: candidature.otherJobs,
      acceptFollowingTraining: candidature.acceptFollowingTraining
    })
    return registerUser.call(Candidat, candidat, process.env.DEFAULT_TEMP_PASSWORD)
  }
}
