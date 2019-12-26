const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')
const sendSlackNotification = require('../infrastructure/send-slack-notification')
const contractTypeDefault = 'cdi'
const contractTypes = ['cdi', 'cdd-court', 'cdd-long', 'autre']
const offreStatuses = require('./enums/offre-statuses')
const request = require('request-promise-native')
const logger = require('../utils/logger')

const Offre = databaseService.define('offre', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  jobTitle: {
    type: Sequelize.STRING,
    allowNull: true
  },
  jobDescription: {
    type: Sequelize.STRING,
    allowNull: true
  },
  jobAdditionalInfo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  codeROME: {
    type: Sequelize.STRING,
    allowNull: true
  },
  contractType: {
    type: Sequelize.ENUM(contractTypes),
    validate: { isIn: [contractTypes] },
    alllowNull: false,
    defaultValue: contractTypeDefault
  },
  salary: {
    type: Sequelize.STRING,
    allowNull: true
  },
  jobDuration: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  pmsmpDuration: {
    type: Sequelize.STRING,
    allowNull: true
  },
  pmsmpDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'http://l.traitdunion.beta.gouv.fr/candidats/images/user_group.png'
  },
  status: {
    type: Sequelize.ENUM(offreStatuses),
    allowNull: true,
    defaultValue: offreStatuses[0]
  }
})

Offre.associate = ({ Candidature, Metier }) => {
  Offre.hasMany(Candidature)
  Offre.hasOne(Metier, {
    foreignKey: 'codeROME',
    sourceKey: 'codeROME',
    targetKey: 'codeROME'
  })
}

Offre.afterCreate(async (offre, options) => {
  if (offre.status === 'published') {
    await notifyOffreIsPublished(offre)
  }
  return sendSlackNotification({ text: `:envelope_with_arrow: 1 nouvelle offre d'immersion vient d'être déposée en statut \`${offre.status}\`: \n [\`${offre.id}\`] job de ${offre.jobTitle} situé à ${offre.address}` })
})

function notifyOffreIsPublished (offre) {
  const requestOptions = {
    uri: process.env.OFFRE_PUBLISHED_HOOK_URL,
    json: true,
    method: 'POST',
    body: {
      eventType: 'published-offre',
      offre
    }
  }
  logger().debug(`New offre set to published [${offre.id}]: calling Zapier`)
  return request(requestOptions).catch((error) =>
    logger().error(`Zapier webhook failed: ${error}`)
  )
}

module.exports = Offre
