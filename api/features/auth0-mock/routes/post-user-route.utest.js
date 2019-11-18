const { sinon, expect } = require('../../../src/test-utils')

const jwksMock = { start: sinon.spy() }
const createJWKSMock = sinon.stub().returns(jwksMock)
const getJSON = sinon.stub()
const routes = require('./routes')(createJWKSMock, getJSON)

describe('Auth0 mock routes', () => {
  describe('post User', () => {
    const appMetadata = {
      profile: {
        id: '999666',
        name: 'INTERN'
      },
      tempPassword: true
    }
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
      send: sinon.spy()
    }

    it('replies 201 with new user info in body', () => {
      const req = {
        body: {
          connection: 'traitdunion-users',
          email: 'all-new-perm@e2e.fr',
          password: '1234567890',
          app_metadata: appMetadata
        }
      }

      routes.postUser(req, res)

      expect(res.status).to.have.been.calledWith(201)
      expect(res.json).to.have.been.calledWith(_expectedResponse())
    })

    it('returns status 409 when email already exists', () => {
      const req = {
        body: {
          connection: 'traitdunion-users',
          email: 'perm-1@e2e.fr',
          password: '1234567890',
          app_metadata: appMetadata
        }
      }

      routes.postUser(req, res)

      expect(res.status).to.have.been.calledWith(409)
      expect(res.send).to.have.been.calledWith('The user already exists.')
    })
  })
})

function _expectedResponse () {
  return {
    user_id: 'auth0|all-new-perm@e2e.fr',
    email: 'all-new-perm@e2e.fr',
    email_verified: false,
    created_at: '2018-07-03T14:01:23.490Z',
    updated_at: '2018-07-03T14:01:23.490Z',
    identities: [
      {
        connection: 'traitdunion-users',
        user_id: 'all-new-perm@e2e.fr',
        provider: 'auth0',
        isSocial: false
      }
    ],
    app_metadata: {
      profile: {
        id: '999666',
        name: 'candidat'
      },
      tempPassword: true
    }
  }
}
