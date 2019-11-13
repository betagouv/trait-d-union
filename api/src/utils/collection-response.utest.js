const { sinon, expect } = require('../test-utils')
const { collectionResponse } = require('./')

describe('.collectionResponse({ h, itemName, collection, allItemsCount, offset, limit })', () => {
  let codeStub, headerStub, h

  beforeEach(() => {
    codeStub = { code: sinon.stub() }
    headerStub = { header: sinon.stub().returns(codeStub) }
    h = { response: sinon.stub().returns(headerStub) }
  })

  afterEach(() => {
    codeStub.code.reset()
    headerStub.header.reset()
    h.response.reset()
  })

  describe('when asked items are fewer than all existing items', () => {
    it('returns code 206 and partial content-range', () => {
      // GIVEN
      const collection = [{ firstName: 'Sandrine' }, { firstName: 'Jean' }]
      const params = {
        h,
        itemName: 'worker',
        collection,
        allItemsCount: 9,
        offset: 4,
        limit: 2
      }

      // WHEN
      collectionResponse(params)

      // THEN
      expect(h.response).to.have.been.calledWith(collection)
      expect(h.response().header).to.have.been.calledWith('Content-Range', 'worker 4-5/9')
      expect(h.response().header().code).to.have.been.calledWith(206)
    })
  })

  describe('when asked items equals all existing items (2 items)', () => {
    it('returns code 200 and complete content-range', () => {
      // GIVEN
      const collection = [{ firstName: 'Sandrine' }, { firstName: 'Jean' }]
      const params = {
        h,
        itemName: 'worker',
        collection,
        allItemsCount: 2,
        offset: 0,
        limit: 2
      }

      // WHEN
      collectionResponse(params)

      // THEN
      expect(h.response).to.have.been.calledWith(collection)
      expect(h.response().header).to.have.been.calledWith('Content-Range', 'worker 0-1/2')
      expect(h.response().header().code).to.have.been.calledWith(200)
    })
  })

  describe('when asked items equals all existing items (1 item)', () => {
    it('returns code 200 and empty content-range', () => {
      // GIVEN
      const collection = [{ firstName: 'Sandrine' }]
      const params = {
        h,
        itemName: 'worker',
        collection,
        allItemsCount: 1,
        offset: 0,
        limit: 1
      }

      // WHEN
      collectionResponse(params)

      // THEN
      expect(h.response).to.have.been.calledWith(collection)
      expect(h.response().header).to.have.been.calledWith('Content-Range', 'worker 1/1')
      expect(h.response().header().code).to.have.been.calledWith(200)
    })
  })

  describe('when allItemsCount is null', () => {
    it('returns code 200 and empty content-range', () => {
      // GIVEN
      const collection = []
      const params = {
        h,
        itemName: 'worker',
        collection,
        allItemsCount: 0,
        offset: 10,
        limit: 15
      }

      // WHEN
      collectionResponse(params)

      // THEN
      expect(h.response).to.have.been.calledWith(collection)
      expect(h.response().header).to.have.been.calledWith('Content-Range', 'worker 0/0')
      expect(h.response().header().code).to.have.been.calledWith(200)
    })
  })
})
