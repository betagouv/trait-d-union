const { sinon, expect } = require('../../../src/test-utils')

const jwksMock = { start: sinon.spy() }
const createJWKSMock = sinon.stub().returns(jwksMock)
const getJSON = sinon.stub()
const routes = require('./routes')(createJWKSMock, getJSON)

const mockedUsers = require('../users')

describe('Auth0 mock routes', () => {
  describe('get User', () => {
    it('should return the user by userId', () => {
      const userId = 'auth0|client-1@e2e.fr'
      const req = { params: { userId: userId } }
      const res = { json: sinon.spy() }

      routes.getUser(req, res)

      const expectedUser = mockedUsers[userId]
      expect(res.json).to.have.been.calledWith(expectedUser)
    })

    it('should return status 404 when user is not found', () => {
      const userId = 'userId_not_found'
      const req = { params: { userId: userId } }
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      }

      routes.getUser(req, res)

      expect(res.status).to.have.been.calledWith(404)
      expect(res.send).to.have.been.calledWith('user ' + userId + ' not found')
    })
  })
})
