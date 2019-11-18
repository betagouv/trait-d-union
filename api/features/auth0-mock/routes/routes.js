const getUserRoute = require('./get-user-route')
const postUserRoute = require('./post-user-route')

module.exports = (createJWKSMock, getJSON) => {
  const jwksMock = createJWKSMock('http://localhost:3334')
  jwksMock.start()

  return {
    postToken: (req, res) => {
      if (req.body.grant_type === 'client_credentials') {
        res.json({ access_token: 'fakeAdminToken' })
      } else {
        const accessToken = jwksMock.token({
          iss: 'http://localhost:3333/',
          sub: 'auth0|' + req.body.username,
          aud: [
            'http://localhost:3333/api/v2/',
            'http://localhost:3333/userinfo'
          ],
          scope: req.body.scope
        })
        res.json({ access_token: accessToken })
      }
    },

    getUser: getUserRoute,
    postUser: postUserRoute,

    getJwks: (req, res) => {
      getJSON('http://localhost:3334/.well-known/jwks.json', (_, response) => {
        res.json(response)
      })
    }
  }
}
