const spaClientId = process.env.SPA_CLIENT_ID
const spaClientSecret = process.env.SPA_CLIENT_SECRET
const got = require('got')

module.exports.authenticateUser = authenticateUser

const prefixUrl = 'http://localhost:3333'

async function authenticateUser (email) {
  const authenticateUserOptions = {
    body: {
      grant_type: 'password',
      username: email,
      scope: 'openid profile',
      client_id: spaClientId,
      client_secret: spaClientSecret
    },
    json: true
  }
  const authenticateUserUrl = `${prefixUrl}/oauth/token`
  // eslint-disable-next-line no-console
  const authorizationResponse = await got.post(authenticateUserUrl, authenticateUserOptions).catch(error => console.log(error))

  return authorizationResponse.body.access_token
}
