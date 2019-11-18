const createStatusService = require('./status-service.js')
const { expect } = require('../../test-utils')

const getStatus = createStatusService()

describe('Status service', () => {
  describe('.()', () => {
    it('replies package.json version and sha1 version', async () => {
      // WHEN
      const actual = await getStatus()
      // THEN
      expect(actual).to.have.property('version')
      expect(actual).to.have.property('sha1')
    })
  })
})
