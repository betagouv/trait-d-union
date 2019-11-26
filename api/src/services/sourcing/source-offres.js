const logger = require('../../utils/logger')
const createFindOffres = require('./find-offres')
const cache = require('../../infrastructure/cache')
const apiConfiguration = require('../../infrastructure/api-configuration')
const sendSlackNotification = require('../../infrastructure/send-slack-notification')
const poleEmploiApiService = require('../../repositories/pole-emploi-api-service')({
  apiConfiguration,
  cache
})
const offresRepository = require('../../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })
const { contactsApiClient } = require('../../infrastructure/sendinblue-api-client')
const subscribeEnterpriseToMailingContactList = require('./subscribe-enterprise-to-mailing-contact-list')({ contactsApiClient })

module.exports = (models) => async (departement) => {
  const findOffres = createFindOffres(models, [offresRepository])
  const result = await findOffres(departement)
  const offresWithEmail = keepOffresWithEmail(result)
  logger().info(`Source ${result.length} offres, ${offresWithEmail.length} offres with email are cdi or cdd >= 6 mois`)
  offresWithEmail.forEach(async (offre) => {
    await subscribeEnterpriseToMailingContactList(offre).catch()
  })
  await notifyEnterpriseAddition(offresWithEmail, departement)
  return offresWithEmail
}

function keepOffresWithEmail (offres) {
  return offres.filter(({ contact }) => contact && contact.courriel && contact.courriel.indexOf('pole-emploi') < 0)
}

function notifyEnterpriseAddition (offres, departement) {
  return sendSlackNotification({ text: `:heart: ${offres.length} nouvelles entreprises ajoutées à la liste de prospects pour le département ${departement}` })
}
