const logger = require('../../utils/logger')
const configurationService = require('../../services/configuration-service')
const { DateTime } = require('luxon')

const enterpriseListId = 34

module.exports = ({ contactsApiClient }) => async (offre) => {
  if (configurationService.get('TU_FF_USE_REAL_SENDINBLUE') === 'off') {
    return
  }
  const { contact: enterprise, lieuTravail } = offre
  const contact = {
    email: enterprise.courriel,
    attributes: {
      NOM_COMPLET: enterprise.nom.split(' - ')[1],
      TITRE_OFFRE: encodeURIComponent(offre.intitule),
      ORGANISME: enterprise.nom.split(' - ')[0],
      CODE_POSTAL: lieuTravail.codePostal,
      ADRESSE: lieuTravail.libelle,
      DATE_AJOUT_OFFRE: formatDate()
    },
    listIds: [enterpriseListId]
  }
  logger().debug(`Enterprise added to SendInBlue contacts: ${enterprise.courriel}`)
  return contactsApiClient.createContact(contact).catch(async err => {
    logger().error(`Error while adding Enterprise to SendInBlue contacts - ${err.response && err.response.text}`)
    await contactsApiClient.updateContact(enterprise.courriel, contact).catch(err => {
      logger().error(`Error while updating Enterprise to SendInBlue contacts - ${err.response && err.response.text}`)
    })
  })
}

function formatDate (date = new Date()) {
  const dt = DateTime.fromJSDate(date)
  return dt.setLocale('fr').toISODate()
}
