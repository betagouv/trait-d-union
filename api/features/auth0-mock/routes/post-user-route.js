const mockedUsers = require('../users')

module.exports = (req, res) => {
  const user = mockedUsers[`auth0|${req.body.email}`]
  if (user) {
    return res.status(409).send('The user already exists.')
  }
  return res.status(201).json(_userCreationResponse())

  function _userCreationResponse () {
    return {
      user_id: `auth0|${req.body.email}`,
      email_verified: false,
      email: req.body.email,
      created_at: '2018-07-03T14:01:23.490Z',
      updated_at: '2018-07-03T14:01:23.490Z',
      identities: [
        {
          connection: 'traitdunion-users',
          user_id: req.body.email,
          provider: 'auth0',
          isSocial: false
        }
      ],
      app_metadata: req.body.app_metadata
    }
  }
}
