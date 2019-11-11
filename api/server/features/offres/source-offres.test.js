const { sinon, expect } = require('../../../tests/test-utils')

const proxyquire = require('proxyquire')

const offreWithEmail = {
  id: 'offre-with-email',
  contact: { courriel: 'some-email' }
}
const sourcedOffres = [offreWithEmail, {
  id: 'offre-without-email',
  contact: {}
}, {
  id: 'offre-without-contact'
}]
const findOffresStub = sinon.spy(async () => sourcedOffres)
const createFindOffresStub = sinon.spy(() => findOffresStub)
const offresRepositoryStub = {}
const createOffresRepositoryStub = sinon.spy(() => offresRepositoryStub)
const filterShortTermCddStub = sinon.spy((offres) => offres)
const blacklistOffresStub = sinon.spy((offres) => offres)

const sourceOffres = proxyquire('./source-offres', {
  './find-offres': createFindOffresStub,
  '../../repositories/pole-emploi-offres/offres-pole-emploi-repository': createOffresRepositoryStub,
  './filter-short-term-cdd': filterShortTermCddStub,
  './blacklist-offres': blacklistOffresStub
})

const Offre = {
  app: { models: {} },
  findById: sinon.spy(async () => ({
    updateAttributes: sinon.spy()
  })),
  updateAttributes: sinon.spy(),
  updateAll: sinon.spy()
}

describe('Source offres', () => {
  it('creates the find offres with models and repositories', async () => {
    await sourceOffres({ Offre })

    expect(createFindOffresStub).to.have.been.calledWith(Offre.app.models, [offresRepositoryStub])
  })

  it('retrieves offres from repositories', async () => {
    await sourceOffres({ Offre })

    expect(findOffresStub).to.have.been.called()
  })

  it('keeps only offres with email', async () => {
    const offres = await sourceOffres({ Offre })

    expect(offres).to.eql([offreWithEmail])
  })

  it('keeps only offres with long term CDD and CDI', async () => {
    await sourceOffres({ Offre })

    expect(filterShortTermCddStub).to.have.been.called()
  })

  it('blacklist offres', async () => {
    await sourceOffres({ Offre })

    expect(blacklistOffresStub).to.have.been.called()
  })

  context('when it sourced 1 new offre, 0 updated offre', () => {
    const Offre = {
      app: { models: {} },
      findById: sinon.spy(async () => null),
      create: sinon.spy(async () => ({})),
      updateAll: sinon.spy(async () => ({}))
    }

    it('creates received offre', async () => {
      await sourceOffres({ Offre })

      expect(Offre.create).to.have.been.calledWith({
        id: offreWithEmail.id,
        data: offreWithEmail
      })
    })

    it('updates status of non received offre to "unavailable" status', async () => {
      process.env.TU_FF_ADD_FAKE_DATA = 'off'
      await sourceOffres({ Offre })

      expect(Offre.updateAll).to.have.been.calledWith({
        id: {
          nin: [offreWithEmail.id]
        }
      }, {
        status: 'unavailable'
      })
    })

    it('updates fake offres status to "available', async () => {
      process.env.TU_FF_ADD_FAKE_DATA = 'on'
      await sourceOffres({ Offre })

      expect(Offre.updateAll).to.have.been.calledWith({
        id: { regexp: 'fake-offre-id(.*)' }
      }, {
        status: 'available'
      })
    })
  })

  context('when it sourced 0 new offre, 1 updated offre', () => {
    const updateAttributesSpy = sinon.spy(async () => ({}))
    const Offre = {
      app: { models: {} },
      findById: sinon.spy(async () => ({
        updateAttributes: updateAttributesSpy
      })),
      create: sinon.spy(async () => ({})),
      updateAll: sinon.spy(async () => ({}))
    }

    it('does not create received offre', async () => {
      await sourceOffres({ Offre })

      expect(Offre.create).to.not.have.been.calledWith({
        id: offreWithEmail.id,
        data: offreWithEmail
      })
    })

    it('updates received offre', async () => {
      await sourceOffres({ Offre })

      expect(updateAttributesSpy).to.have.been.calledWith({ data: offreWithEmail })
    })
  })
})
