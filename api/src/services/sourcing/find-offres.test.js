const { sinon, expect } = require('../../test-utils')
const createFindOffres = require('./find-offres')

describe('Find Offres', () => {
  context('for all Metiers', () => {
    const codeROME = 'H2903'
    const session = {
      numero: 'some-session-numero',
      dateDebut: new Date(Date.UTC(2030, 1, 1))
    }
    const actionWithSessions = {
      sessions: () => [session],
      toJSON: () => ({ sessions: [session] })
    }
    const diplomeWithActionsAndSession = { actions: () => [actionWithSessions] }
    const metierWithSession = {
      codeROME,
      diplomes: () => [diplomeWithActionsAndSession]
    }
    const offreFromRepository = {
      some: 'offer',
      codeROME
    }
    const departement = 57
    const offresRepository = { getOffres: sinon.spy(async () => [offreFromRepository]) }
    const Metier = mockMetierModel([metierWithSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('retrieves all Metiers related to Sessions Formations', async () => {
      await findOffres(departement)
      expect(Metier.findAll).to.have.been.calledWith()
    })

    it('searches for offres', async () => {
      await findOffres(departement)
      expect(offresRepository.getOffres).to.have.been.calledWith([codeROME])
    })

    it('returns offres', async () => {
      const expected = Object.assign({}, offreFromRepository)

      const actual = await findOffres(departement)

      expect(actual).to.deep.equal([expected])
    })
  })
})

function mockMetierModel (metiers) {
  return { findAll: sinon.spy(async () => metiers) }
}
