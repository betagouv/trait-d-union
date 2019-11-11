const { expect } = require('../../../tests/test-utils')
const formatOffre = require('./format-offre')

describe('Format Offres', () => {
  it('returns an object with timestamps and data', () => {
    const rawOffre = {
      id: '079NNGS',
      data: { some: 'data' },
      createdAt: '2019-06-05T14:17:39.129Z',
      updatedAt: '2019-06-05T14:17:39.129Z'
    }

    const formattedOffre = formatOffre(rawOffre)

    expect(formattedOffre).to.haveOwnProperty('some')
    expect(formattedOffre).to.haveOwnProperty('createdAt')
    expect(formattedOffre).to.haveOwnProperty('updatedAt')
  })
})
