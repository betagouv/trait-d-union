const Sequelize = require('sequelize')
const databaseService = require('../services/database-service')
const niveauxEtude = require('./enums/niveaux-etude')
const sendSlackNotification = require('../infrastructure/send-slack-notification')

const Candidature = databaseService.define('candidature', {
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
    unique: false
  },
  niveauEtude: {
    type: Sequelize.ENUM(niveauxEtude),
    validate: { isIn: niveauxEtude },
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
  }
})

Candidature.associate = ({ Offre }) => {
  Candidature.belongsTo(Offre)
}

Candidature.afterCreate(async (candidature, options) => {
  const candidatureFromDB = await Candidature.findByPk(candidature.id, { include: 'offre' })
  return sendSlackNotification({ text: `:mailbox_with_mail: 1 nouvelle candidature vient d'être déposée par ${candidatureFromDB.firstName} ${candidatureFromDB.lastName} : \n [Offre \`${candidatureFromDB.offre.id}\`] job de ${candidatureFromDB.offre.jobTitle} situé à ${candidatureFromDB.offre.address}` })
})

module.exports = Candidature
