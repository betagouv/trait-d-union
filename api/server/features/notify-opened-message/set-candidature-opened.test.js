const { sinon, expect } = require('../../../tests/test-utils')
const setCandidatureOpened = require('./set-candidature-opened')

describe('Set Candidature Opened', () => {
  it('update status to opened', async () => {
    const candidature = {
      updateAttribute: sinon.spy(async () => {
      })
    }

    await setCandidatureOpened(candidature)

    expect(candidature.updateAttribute).to.have.been.calledWith('status', 'opened')
  })
})
