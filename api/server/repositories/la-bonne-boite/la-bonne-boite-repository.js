module.exports = ({ poleEmploiApiService }) => {
  return {
    getOffres: async ({ codeROME }) => {
      const offres = await searchEntreprises(poleEmploiApiService)(codeROME)
      return offres.map(sanitizeEntreprise)
    }
  }
}

const searchEntreprises = (poleEmploiApiService) => async (codeROME) => {
  const searchParameters = {
    rome_codes: codeROME,
    commune_id: 57463,
    distance: 10
  }
  const { companies } = await poleEmploiApiService.request('/labonneboite/v1/company', searchParameters)
  return companies
}

function sanitizeEntreprise (entreprise) {
  return {
    url: entreprise.url,
    id: entreprise.siret,
    source: 'la-bonne-boite'
  }
}
