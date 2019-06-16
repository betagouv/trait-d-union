const candidatListId = 23
const entrepriseListId = 24

module.exports = ({ contactsApiClient }, candidat) => {
  const contact = {
    email: candidat.email,
    attributes: {
      'SMS': candidat.telephone,
      'NOM_COMPLET': candidat.nomPrenom,
      'URL_CV': candidat.cvUrl
    },
    listIds: [candidatListId, entrepriseListId]
  }
  contactsApiClient.createContact(contact)
}
