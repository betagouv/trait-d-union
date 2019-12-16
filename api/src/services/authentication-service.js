const logger = require('../utils/logger')

module.exports = ({ Candidat }) => async (session) => {
  logger().debug(`Retrieving credentials from session ${JSON.stringify(session)}`)
  if (session[0]) session = session[0]
  const userId = session.id
  logger().debug(`Retrieving info for user with id ${userId}`)
  const user = await Candidat.findByPk(userId, {
    include: [],
    attributes: { exclude: ['password', 'salt', 'activationKey', 'verified', 'resetPasswordKey'] }
  })
  return {
    valid: !!user,
    credentials: user || null
  }
}
