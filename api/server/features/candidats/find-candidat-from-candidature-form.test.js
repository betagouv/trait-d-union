const { expect, sinon } = require('../../../tests/test-utils')
const findCandidatFromCandidatureForm = require('./find-candidat-from-candidature-form')

describe('Find candidat from candidature form', () => {
  it('Search in DB with user id', async () => {
    const Candidat = {
      findById: sinon.spy(() => ({}))
    }
    const candidatureForm = {
      id: 'candidatId'
    }

    await findCandidatFromCandidatureForm({ Candidat }, candidatureForm)

    expect(Candidat.findById).to.have.been.calledWith('candidatId')
  })

  context('when given Candidat has no id', () => {
    it('returns null', async () => {
      const candidatureForm = {}
      const Candidat = {
        findById: sinon.spy(() => candidatureForm)
      }

      const candidat = await findCandidatFromCandidatureForm({ Candidat }, candidatureForm)

      expect(Candidat.findById).to.not.have.been.called()
      expect(candidat).to.be.null()
    })
  })

  context('when Candidat exists with given userId', () => {
    it('returns candidat', async () => {
      const candidatureForm = {
        id: 'candidatId'
      }
      const Candidat = {
        findById: sinon.spy(() => candidatureForm)
      }

      const candidat = await findCandidatFromCandidatureForm({ Candidat }, candidatureForm)

      expect(candidat).to.eql(candidatureForm)
    })
  })

  context('when Candidat does not exist with given userId', () => {
    it('searches for candidat with given email', async () => {
      const candidatureForm = {
        id: 'candidatId',
        email: 'email@candidat.fr'
      }
      const Candidat = {
        findById: sinon.spy(() => undefined),
        findOne: sinon.spy(() => ({ id: 'correct-id' }))
      }

      await findCandidatFromCandidatureForm({ Candidat }, candidatureForm)

      expect(Candidat.findOne).to.have.been.calledWith({ where: { email: 'email@candidat.fr' } })
    })
    it('returns candidat with correct id', async () => {
      const candidatureForm = {
        id: 'candidatId',
        email: 'email@candidat.fr'
      }
      const Candidat = {
        findById: sinon.spy(() => undefined),
        findOne: sinon.spy(() => ({ id: 'correct-id' }))
      }

      const candidat = await findCandidatFromCandidatureForm({ Candidat }, candidatureForm)

      expect(candidat).to.eql({ id: 'correct-id', email: 'email@candidat.fr' })
    })
  })

  context('when Candidat does not exist with given userId nor given email', () => {
    it('returns null', async () => {
      const candidatureForm = {
        id: 'candidatId',
        email: 'email@candidat.fr'
      }
      const Candidat = {
        findById: sinon.spy(() => undefined),
        findOne: sinon.spy(() => undefined)
      }

      const candidat = await findCandidatFromCandidatureForm({ Candidat }, candidatureForm)

      expect(candidat).to.be.null()
    })
  })
})
