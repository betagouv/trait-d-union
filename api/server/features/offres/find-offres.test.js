const { sinon, expect } = require('../../../tests/test-utils')
const createFindOffres = require('./find-offres')

describe('Find Offres', () => {
  const givenArea = {
    latitude: 1,
    longitude: 2,
    rayon: 3
  }

  context('when one Metier have Session Formation', () => {
    const codeROME = 'H2903'
    const session = { numero: 'some-session-numero', dateDebut: new Date('2030-01-01') }
    const actionWithSessions = {
      sessions: () => [session],
      toJSON: () => ({ sessions: [session] })
    }
    const diplomeWithActionsAndSession = {
      actions: () => [actionWithSessions]
    }
    const metierWithSession = {
      codeROME,
      diplomes: () => [diplomeWithActionsAndSession]
    }
    const offreFromRepository = { some: 'offer', codeROME }
    const offresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([metierWithSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('retrieves all Metiers related to Sessions Formations', async () => {
      await findOffres({ around: givenArea })
      expect(Metier.find).to.have.been.calledWith()
    })

    it('searches for offres', async () => {
      await findOffres({ around: givenArea })
      expect(offresRepository.getOffres).to.have.been.calledWith([codeROME])
    })

    it('returns offres with related session', async () => {
      const expected = Object.assign({}, offreFromRepository)
      Object.assign(expected, { sessions: [session] })

      const actual = await findOffres({ around: givenArea })

      expect(actual).to.deep.equal([expected])
    })
  })

  context('when one Metier have more than 3 Session Formation', () => {
    const codeROME = 'H2903'
    const sessions = [
      { numero: 'some-session-numero', dateDebut: new Date('2030-01-02') },
      { numero: 'some-session-numero', dateDebut: new Date('2030-01-03') },
      { numero: 'some-session-numero', dateDebut: new Date('2030-01-04') },
      { numero: 'some-session-numero', dateDebut: new Date('2030-01-01') }
    ]
    const actionWithSessions = {
      sessions: () => sessions,
      toJSON: () => ({ sessions })
    }
    const diplomeWithActionsAndSession = {
      actions: () => [actionWithSessions]
    }
    const metierWithSession = {
      codeROME,
      diplomes: () => [diplomeWithActionsAndSession]
    }
    const offreFromRepository = { some: 'offer', codeROME }
    const offresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([metierWithSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('returns offres with three first related session', async () => {
      const expected = Object.assign({}, offreFromRepository)
      Object.assign(expected, { sessions: [sessions[3], sessions[0], sessions[1]] })

      const actual = await findOffres({ around: givenArea })

      expect(actual).to.deep.equal([expected])
    })
  })

  context('when all Metier have Session Formation', () => {
    const firstCodeROME = 'H2903'
    const secondCodeROME = 'M1234'
    const session = { numero: 'some-session-numero', dateDebut: new Date('2030-01-02') }
    const actionWithSessions = {
      sessions: () => [session],
      toJSON: () => ({ sessions: [session] })

    }
    const firstDiplomeWithActionsAndSession = {
      actions: () => [actionWithSessions]
    }
    const secondDiplomeWithActionsAndSession = {
      actions: () => [actionWithSessions]
    }
    const firstMetierWithSession = {
      codeROME: firstCodeROME,
      diplomes: () => [firstDiplomeWithActionsAndSession]
    }
    const secondMetierWithSession = {
      codeROME: secondCodeROME,
      diplomes: () => [secondDiplomeWithActionsAndSession]
    }

    const offreFromRepository = { id: 'offre-id', codeROME: firstCodeROME }
    const offresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([firstMetierWithSession, secondMetierWithSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('retrieves all Metiers related to Sessions Formations', async () => {
      await findOffres({ around: givenArea })
      expect(Metier.find).to.have.been.calledWith()
    })

    it('searches for offres', async () => {
      await findOffres({ around: givenArea })
      expect(offresRepository.getOffres).to.have.been.calledWith([firstCodeROME, secondCodeROME])
    })

    it('returns offres with related session', async () => {
      const expected = Object.assign({}, offreFromRepository)
      Object.assign(expected, { sessions: [session] })

      const actual = await findOffres({ around: givenArea })

      expect(actual).to.deep.equal([expected])
    })
  })

  context('when Metier has Diplome but no Action Formation', () => {
    const codeROME = 'H2903'
    const diplomeWithoutAction = { actions: () => [] }
    const metierWithSession = {
      codeROME,
      diplomes: () => [diplomeWithoutAction]
    }

    const offreFromRepository = { some: 'offer', codeROME }
    const offresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([metierWithSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('searches for offres', async () => {
      await findOffres({ around: givenArea })
      expect(offresRepository.getOffres).to.not.have.been.calledWith([codeROME])
    })

    it('returns no offre', async () => {
      const actual = await findOffres({ around: givenArea })

      expect(actual).to.deep.equal([])
    })
  })

  context('when Metier has Action but no Session Formation', () => {
    const codeROME = 'H2903'
    const actionWithoutSessions = {
      sessions: () => [],
      toJSON: () => ({ sessions: [] })
    }
    const diplomeWithActionsAndSession = { actions: () => [actionWithoutSessions] }
    const metierWithActionButWithoutSession = {
      codeROME,
      diplomes: () => [diplomeWithActionsAndSession]
    }

    const offreFromRepository = { some: 'offer', codeROME }
    const offresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([metierWithActionButWithoutSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('searches for offres', async () => {
      await findOffres({ around: givenArea })
      expect(offresRepository.getOffres).to.not.have.been.calledWith([codeROME])
    })

    it('returns no offres', async () => {
      const actual = await findOffres({ around: givenArea })

      expect(actual).to.deep.equal([])
    })
  })

  context('when Metier has two Actions, one with Session and one without Session Formation', () => {
    const codeROME = 'H2903'
    const session = { numero: 'some-session-numero', dateDebut: new Date('2030-01-02') }
    const actionWithoutSessions = {
      sessions: () => [],
      toJSON: () => ({ sessions: [] })
    }
    const actionWithSessions = {
      sessions: () => [session],
      toJSON: () => ({ sessions: [session] })
    }
    const diplomeWithActionsAndSession = {
      actions: () => [actionWithSessions, actionWithoutSessions]
    }
    const metierWithActionButWithoutSession = {
      codeROME,
      diplomes: () => [diplomeWithActionsAndSession]
    }

    const offreFromRepository = { some: 'offer', codeROME }
    const offresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([metierWithActionButWithoutSession])
    const findOffres = createFindOffres({ Metier }, [offresRepository])

    it('searches for offres', async () => {
      await findOffres({ around: givenArea })
      expect(offresRepository.getOffres).to.have.been.calledWith([codeROME])
    })

    it('returns one offre', async () => {
      const expected = Object.assign({}, offreFromRepository)
      Object.assign(expected, { sessions: [session] })

      const actual = await findOffres({ around: givenArea })

      expect(actual).to.deep.equal([expected])
    })
  })

  context('when using two repositories', () => {
    const codeROME = 'H2903'
    const session = { numero: 'some-session-numero', dateDebut: new Date('2030-01-02') }
    const actionWithSessions = {
      sessions: () => [session],
      toJSON: () => ({ sessions: [session] })
    }
    const diplomeWithActionsAndSession = {
      actions: () => [actionWithSessions]
    }
    const metierWithSession = {
      codeROME,
      diplomes: () => [diplomeWithActionsAndSession]
    }
    const offreFromRepository = { some: 'offer', codeROME }
    const firstOffresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const secondOffresRepository = {
      getOffres: sinon.spy(async () => [offreFromRepository])
    }
    const Metier = mockMetierModel([metierWithSession])
    const findOffres = createFindOffres({ Metier }, [firstOffresRepository, secondOffresRepository])

    it('searches offres from both', async () => {
      await findOffres({ around: givenArea })
      expect(firstOffresRepository.getOffres).to.have.been.calledWith([codeROME])
      expect(secondOffresRepository.getOffres).to.have.been.calledWith([codeROME])
    })

    it('returns offres from both', async () => {
      const expected = Object.assign({}, offreFromRepository)
      Object.assign(expected, { sessions: [session] })

      const actual = await findOffres({ around: givenArea })
      expect(actual).to.deep.equal([expected, expected])
    })
  })
})

function mockMetierModel (metiers) {
  return { find: sinon.spy(async () => metiers) }
}
