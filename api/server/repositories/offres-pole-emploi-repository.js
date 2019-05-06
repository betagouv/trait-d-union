module.exports = ({ poleEmploiApiService }) => ({
  getOffres: async ({ codeROME }) => {
    const searchParameters = {
      codeROME,
      commune: 57463,
      distance: 10,
      experience: 1,
      range: '1-149',
      sort: 2
    }
    const offres = await poleEmploiApiService.request('/offres/search', searchParameters)
    return offres.resultats.map(sanitizeOffre)
  }
})

function sanitizeOffre (offre) {
  const properties = ['id', 'description', 'dureeTravailLibelle', 'secteurActiviteLibelle',
    'lieuTravail', 'appellationlibelle', 'salaire', 'permis', 'natureContrat',
    'typeContrat']

  const result = keepDefinedProperties(offre, properties)

  const urlOffre = offre.origineOffre && offre.origineOffre.urlOrigine
  result.url = urlOffre
  result.courriel = 'some@email.fr'

  return result
}

function keepDefinedProperties (object, properties) {
  return properties.reduce((result, property) => {
    if (object[property]) {
      result[property] = object[property]
    }
    return result
  }, {})
}
