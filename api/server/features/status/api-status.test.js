const { expect } = require('../../../tests/test-utils')
const apiStatus = require('./api-status')

describe('API Status', () => {
  it('returns API current version', () => {
    const version = '6.6.6'
    const packageInfo = { version }
    const getApiStatus = apiStatus(packageInfo)
    const expected = { version }

    const actual = getApiStatus()

    expect(actual).to.eql(expected)
  })
})
