const { expect, sinon } = require('../../../tests/test-utils')
const createLaBonneBoiteRepository = require('./la-bonne-boite-repository')

describe('LaBonneBoite Repository', () => {
  describe('.getOffres(codesROME)', () => {
    const codeROME = 'codeROME'
    const entreprise = createFullEntreprise()
    const poleEmploiApiService = {
      request: sinon.spy(async () => {
        return { companies: [entreprise] }
      })
    }
    const laBonneBoiteRepository = createLaBonneBoiteRepository({ poleEmploiApiService })

    it('requests poleEmploiApi', async () => {
      await laBonneBoiteRepository.getOffres([codeROME])

      expect(poleEmploiApiService.request).to.have.been.calledWith('/labonneboite/v1/company', {
        rome_codes: codeROME,
        commune_id: 57463,
        distance: 10
      })
    })

    it('returns sanitized la bonne boite entreprises', async () => {
      const offres = await laBonneBoiteRepository.getOffres([codeROME])

      expect(offres).to.deep.equal([createExpectedEntreprise()])
    })
  })
})

function createFullEntreprise () {
  return {
    'address': 'Service des ressources humaines, 3 BOULEVARD PAIXHANS, 57000 METZ',
    'alternance': false,
    'boosted': false,
    'city': 'METZ',
    'contact_mode': 'Envoyer un CV et une lettre de motivation',
    'distance': 1.4,
    'headcount_text': '200 à 249 salariés',
    'lat': 49.1207,
    'lon': 6.18389,
    'matched_rome_code': 'codeROME',
    'matched_rome_label': 'Conduite d\'engins agricoles et forestiers',
    'matched_rome_slug': 'conduite-d-engins-agricoles-et-forestiers',
    'naf': '0220Z',
    'naf_text': 'Exploitation forestière',
    'name': 'AGENCE DE METZ',
    'siret': '66204311602105',
    'social_network': '',
    'stars': 2.5,
    // eslint-disable-next-line max-len
    'url': 'https://labonneboite.pole-emploi.fr/66204311602105/details?rome_code=A1101&utm_medium=web&utm_source=api__emploi_store_dev&utm_campaign=api__emploi_store_dev__test'
  }
}

function createExpectedEntreprise () {
  return {
    id: '66204311602105',
    source: 'la-bonne-boite',
    codeROME: 'codeROME',
    // eslint-disable-next-line max-len
    url: 'https://labonneboite.pole-emploi.fr/66204311602105/details?rome_code=A1101&utm_medium=web&utm_source=api__emploi_store_dev&utm_campaign=api__emploi_store_dev__test'
  }
}
