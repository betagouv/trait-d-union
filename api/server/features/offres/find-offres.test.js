const { expect } = require('../../../tests/test-utils')
const createFindOffres = require('./find-offres')

describe('Find Offres', () => {
  context('when there is no Formation in given area', () => {
    it('throws an error', async () => {
      const givenArea = {
        latitude: 1,
        longitude: 2,
        rayon: 3
      }
      const Formation = {
        find: async () => []
      }
      const findOffres = createFindOffres({ Formation })

      return findOffres({ around: givenArea }).should.be.rejected().then(error => {
        expect(error.message).to.equal('Aucune formation n\'est disponible. ' +
          'Vérifiez que vous avez bien inséré le PRF en base ou réessayer en changeant de zone géographique.')
        expect(error.code).to.equal('no-formation-found')
        expect(error.statusCode).to.equal(404)
      })
    })
  })

  context('when there is no Offre in given area', () => {
    it('throws an error', async () => {
      const givenArea = {
        latitude: 1,
        longitude: 2,
        rayon: 3
      }
      const Formation = {
        find: async () => [{ id: 1 }]
      }
      const findOffres = createFindOffres({ Formation })

      return findOffres({ around: givenArea }).should.be.rejected().then(error => {
        expect(error.message).to.equal('Aucune offre accessible avec une formation ' +
          'n\'a été trouvée dans la zone demandée.')
        expect(error.code).to.equal('no-offre-found')
        expect(error.statusCode).to.equal(404)
      })
    })
  })
})
