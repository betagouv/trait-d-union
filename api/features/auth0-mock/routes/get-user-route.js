const mockedUsers = require('../users')

module.exports = (req, res) => {
  const user = mockedUsers[req.params.userId]
  if (!user) {
    return res.status(404).send('user ' + req.params.userId + ' not found')
  }
  res.json(user)
}
