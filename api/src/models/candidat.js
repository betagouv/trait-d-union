const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')
const niveauxEtude = require('./enums/niveaux-etude')
const passportLocalSequelize = require('passport-local-sequelize')
const sendSlackNotification = require('../infrastructure/send-slack-notification')
const request = require('request-promise-native')
const configurationService = require('../services/configuration-service')
const logger = require('../utils/logger')

const Candidat = databaseService.define('candidat', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  niveauEtude: {
    type: Sequelize.ENUM(niveauxEtude),
    validate: { isIn: [niveauxEtude] },
    allowNull: true
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  poleEmploiId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  otherJobs: {
    type: Sequelize.STRING,
    allowNull: true
  },
  acceptFollowingTraining: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  activationKey: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetPasswordKey: {
    type: Sequelize.STRING,
    allowNull: true
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

passportLocalSequelize.attachToUser(Candidat, {
  usernameField: 'email',
  saltField: 'salt',
  hashField: 'password'
})

Candidat.afterCreate(async (candidat, options) => {
  ['password', 'salt', 'activationKey', 'verified', 'resetPasswordKey'].forEach(field => delete candidat[field])
  const requestOptions = {
    uri: configurationService.get('CANDIDAT_CREATED_HOOK_URL'),
    json: true,
    method: 'POST',
    body: {
      eventType: 'new-candidat',
      candidat
    }
  }
  logger().debug('New candidat received: calling Zapier', { candidat })
  await request(requestOptions).catch(error => logger().error(`Zapier webhook failed: ${error}`))
  return sendSlackNotification({ text: `:man-girl: 1 nouveau candidat(e) vient de s'inscrire ${candidat.firstName} ${candidat.lastName}` })
})

module.exports = Candidat
