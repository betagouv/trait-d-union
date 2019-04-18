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
    return offres.resultats.map(offre => ({ url: offre.origineOffre.urlOrigine }))
  }
})
