const { expect } = require('../../../tests/test-utils')
const filterShortTermCDD = require('./filter-short-term-cdd')

describe('filter short term CDD', function () {
  context('when natureContrat is Contrat Professionnalisation', () => {
    it('returns no offer', () => {
      const offres = [{ natureContrat: 'Cont. professionnalisation' }]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql([])
    })
  })
  context('when natureContrat is Contrat apprentissage', () => {
    it('returns no offer', () => {
      const offres = [{ natureContrat: 'Contrat apprentissage' }]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql([])
    })
  })
  context('when type is CDI', () => {
    it('returns all offres', () => {
      const offres = [{ typeContrat: 'CDI', typeContratLibelle: '' }]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql(offres)
    })
  })

  context('when type is CDD - 1 mois', () => {
    it('returns 0 offre', () => {
      const offres = [{ typeContrat: 'CDD', typeContratLibelle: 'Contrat à durée déterminée - 1 Mois' }]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql([])
    })
  })

  context('when type is CDD - 6 mois', () => {
    it('returns all offres', () => {
      const offres = [{ typeContrat: 'CDD', typeContratLibelle: 'Contrat à durée déterminée - 6 Mois' }]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql(offres)
    })
  })

  context('when type Libelle is not defined', () => {
    it('returns all offres', () => {
      const offres = [{ typeContrat: 'CDD', typeContratLibelle: undefined }]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql(offres)
    })
  })

  context('when type is CDI and CDD 2 Mois', () => {
    it('returns 1 offre (CDI)', () => {
      const cdiOffre = { typeContrat: 'CDI', typeContratLibelle: '' }
      const offres = [
        cdiOffre,
        { typeContrat: 'CDD', typeContratLibelle: 'Contrat à durée déterminée - 2 Mois' }
      ]

      const filteredOffres = filterShortTermCDD(offres)

      expect(filteredOffres).to.eql([cdiOffre])
    })
  })
})
