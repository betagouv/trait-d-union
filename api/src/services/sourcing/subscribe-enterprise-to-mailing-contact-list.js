const logger = require('../../utils/logger')

const enterpriseListId = 35

module.exports = ({ contactsApiClient }) => async (offre) => {
  const { contact: enterprise, lieuTravail } = offre
  const contact = {
    email: enterprise.courriel,
    attributes: {
      NOM_COMPLET: enterprise.nom,
      TITRE_OFFRE: offre.intitule,
      ORGANISME: enterprise.nom.split(' - ')[0],
      CODE_POSTAL: lieuTravail.codePostal,
      ADRESSE: lieuTravail.libelle
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
