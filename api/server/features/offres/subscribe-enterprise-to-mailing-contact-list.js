const { error, debug } = require('../../infrastructure/logger')

const enterpriseListId = 34

module.exports = ({ contactsApiClient }) => async (enterprise) => {
  const contact = {
    email: enterprise.courriel,
    attributes: {
      NOM_COMPLET: enterprise.nom
    },
    listIds: [enterpriseListId]
  }
  debug(`Enterprise added to SendInBlue contacts: ${enterprise.courriel}`)
  return contactsApiClient.createContact(contact).catch(err => {
    error(`Error while adding Enterprise to SendInBlue contacts - ${err.response && err.response.text}`)
  })
}
