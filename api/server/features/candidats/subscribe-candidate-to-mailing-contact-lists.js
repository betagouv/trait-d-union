const { error, debug } = require('../../infrastructure/logger')

const candidatListId = 23

module.exports = async ({ contactsApiClient }, candidat) => {
  const contact = {
    email: candidat.email,
    attributes: {
      SMS: candidat.telephone,
      NOM_COMPLET: candidat.nomPrenom,
      URL_CV: candidat.cvUrl,
      NIVEAU_QUALIFICATION: candidat.niveauQualification
    },
    listIds: [candidatListId]
  }
  debug(`Candidat added to SendInBlue contacts: ${candidat.id}`)
  return contactsApiClient.createContact(contact).catch(err => {
    error(`Error while adding Candidat to SendInBlue contacts - ${err.response && err.response.text}`)
  })
}
