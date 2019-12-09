const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')
const sendSlackNotification = require('../infrastructure/send-slack-notification')
const request = require('request-promise-native')
const configurationService = require('../services/configuration-service')
const logger = require('../utils/logger')

const Candidature = databaseService.define('candidature', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  offreId: {
    type: Sequelize.UUID,
    allowNull: false
  },
  candidatId: {
    type: Sequelize.UUID,
    allowNull: false
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
}, {
  freezeTableName: true,
  tableName: 'candidatures'
})

Candidature.associate = ({ Candidature, Offre, Candidat }) => {
  Offre.Candidats = Offre.belongsToMany(Candidat, { through: { model: Candidature } })
  Candidat.belongsToMany(Offre, { through: { model: Candidature } })
  Offre.Candidatures = Candidat.hasMany(Candidature)
  Candidature.belongsTo(Offre)
  Candidature.belongsTo(Candidat)
}

Candidature.afterCreate(async (candidature, options) => {
  const candidatureFromDB = await Candidature.findByPk(candidature.id, { include: 'offre' })
  const requestOptions = {
    uri: configurationService.get('CANDIDATURE_RECEIVED_HOOK_URL'),
    json: true,
    method: 'POST',
    body: {
      eventType: 'new-candidature',
      candidature: candidatureFromDB
    }
  }
  logger().debug('New candidature received: calling Zapier', { candidature: candidatureFromDB })
  await request(requestOptions).catch(error => logger().error(`Zapier webhook failed: ${error}`))
  return sendSlackNotification({ text: `:mailbox_with_mail: 1 nouvelle candidature vient d'être déposée par ${candidatureFromDB.firstName} ${candidatureFromDB.lastName} : \n [Offre \`${candidatureFromDB.offre.id}\`] job de ${candidatureFromDB.offre.jobTitle} situé à ${candidatureFromDB.offre.address}` })
})

module.exports = Candidature
