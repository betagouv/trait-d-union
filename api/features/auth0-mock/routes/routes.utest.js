const { sinon, expect } = require('../../../src/test-utils')

const jwksMock = { start: sinon.spy() }
const createJWKSMock = sinon.stub().returns(jwksMock)
const getJSON = sinon.stub()
const jwksMockHost = 'http://localhost:3334'

const routes = require('./routes')(createJWKSMock, getJSON)

describe('Auth0 mock routes', () => {
  describe('on init', () => {
    it('should init JSON Web Key Set Mock', () => {
      expect(createJWKSMock).to.have.been.calledWith(jwksMockHost)
    })

    it('should start the JSON Web Key Set Mock', () => {
      expect(jwksMock.start).to.have.been.calledOnce()
    })
  })

  describe('retrieve Access Token', () => {
    it('should return a fake token to access Management API', () => {
      const req = {
        body: {
          client_id: 'adminClientId',
          client_secret: 'adminClientSecret',
          grant_type: 'client_credentials',
          audience: 'auth0BaseUrl/api/v2/'
        }
      }
      const res = { json: sinon.spy() }

      routes.postToken(req, res)

      expect(res.json).to.have.been.calledWith({ access_token: 'fakeAdminToken' })
    })

    describe('to access Authentification API', () => {
      const req = {
        body: {
          client_id: 'spaClientId',
          client_secret: 'spaClientSecret',
          grant_type: 'password',
          username: 'userMail',
          password: 'userPassword',
          scope: 'openid profile'
        }
      }
      const res = { json: sinon.spy() }

      it('should return a sign token with jwks-mock', () => {
        jwksMock.token = sinon.stub().returns('fakeAPIToken')

        routes.postToken(req, res)

        expect(res.json).to.have.been.calledWith({ access_token: 'fakeAPIToken' })
      })

      it('should call jwks-mock.token with the right elements', () => {
        jwksMock.token = sinon.stub()

        routes.postToken(req, res)

        const expectedTokenSource = {
          iss: 'http://localhost:3333/',
          sub: 'auth0|' + req.body.username,
          aud: [
            'http://localhost:3333/api/v2/',
            'http://localhost:3333/userinfo'
          ],
          scope: req.body.scope
        }

        expect(jwksMock.token).to.have.been.calledWith(expectedTokenSource)
      })
    })
  })

  describe('get JSON Web Key Set', () => {
    it('should call JSON Web Key Set Mock', () => {
      const req = {}
      const res = {}

      routes.getJwks(req, res)

      expect(getJSON).to.have.been.calledWith(jwksMockHost + '/.well-known/jwks.json')
    })

    it('should return the result of the call of JSON Web Key Set Mock', () => {
      const req = {}
      const res = { json: sinon.spy() }
      const expectedJWKS = {
        keys: [
          {
            alg: 'RSA256',
            e: 'exponent',
            kid: 'thumbprint',
            kty: 'RSA',
            n: 'modulus',
            use: 'sig',
            x5c: ['certDer'],
            x5t: 'thumbprint'
          }
        ]
      }
      getJSON.yields(null, expectedJWKS)

      routes.getJwks(req, res)

      expect(res.json).to.have.been.calledWith(expectedJWKS)
    })
  })
})
