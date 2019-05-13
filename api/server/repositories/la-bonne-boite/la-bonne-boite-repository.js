module.exports = ({ poleEmploiApiService }) => {
  return {
    getOffres: async (codesROME) => {
      const offres = await searchEntreprises(poleEmploiApiService)(codesROME)
      return offres.map(sanitizeEntreprise)
    }
  }
}

const searchEntreprises = (poleEmploiApiService) => async (codesROME) => {
  const searchParameters = {
    rome_codes: codesROME.join(','),
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
    codeROME: entreprise.matched_rome_code,
    source: 'la-bonne-boite'
  }
}
