const { expect, sinon } = require('../../../tests/test-utils')
const setOffresCandidaturesStatus = require('./set-offres-candidatures-status')

describe('Set offres candidatures status', () => {
  it('retrieves all candidatures sent by userId', async () => {
    const Candidat = {
      findOne: sinon.spy(async () => ({ candidatures: () => [] }))
    }
    const offres = [
      { id: 'offre-with-candidature' },
      { id: 'offre-without-candidature' }
    ]
    const userId = 'current-user-id'

    await setOffresCandidaturesStatus({ Candidat }, { offres, userId })

    expect(Candidat.findOne).to.have.been.calledWith({ where: { id: userId }, include: 'candidatures' })
  })

  it('returns offres with status of candidature sent by userId', async () => {
    const userId = 'current-user-id'
    const Candidat = {
      findOne: sinon.spy(async () => ({
        id: userId,
        candidatures: () => [{ id: 'offre-with-candidature' }]
      }))
    }
    const offres = [
      { id: 'offre-with-candidature' },
      { id: 'offre-without-candidature' }
    ]
    const expectedOffres = [
      {
        id: 'offre-with-candidature',
        candidatureStatus: 'applied-offre'
      },
      {
        id: 'offre-without-candidature',
        candidatureStatus: 'non-responded-offre'
      }
    ]

    const filteredOffres = await setOffresCandidaturesStatus({ Candidat }, { offres, userId })

    expect(filteredOffres).to.eql(expectedOffres)
  })

  it('returns 0 offre when candidature sent by userId', async () => {
    const userId = 'current-user-id'
    const Candidat = {
      findOne: sinon.spy(async () => ({
        id: userId,
        candidatures: () => []
      }))
    }
    const offres = [
      { id: 'offre-without-candidature' }
    ]
    const expectedOffres = [
      {
        id: 'offre-without-candidature',
        candidatureStatus: 'non-responded-offre'
      }
    ]

    const filteredOffres = await setOffresCandidaturesStatus({ Candidat }, { offres, userId })

    expect(filteredOffres).to.eql(expectedOffres)
  })
})
