const Slack = require('node-slack')
const configurationService = require('../services/configuration-service')
const slackHookUrl = configurationService.get('SLACK_HOOK_URL')
const logger = require('../utils/logger')

module.exports = ({ username = 'Trait d\'Union', text }) => {
  if (configurationService.get('TU_FF_NOTIFY_ON_SLACK') === 'off') {
    logger().debug('Slack notifications deactivated')
    return
  }
  const slack = new Slack(slackHookUrl)
  return slack.send({
    text,
    username,
    channel: configurationService.get('SLACK_NOTIFICATION_CHANNEL') || '#startup-tu-notif',
    icon_emoji: ':robot_face:'
  })
}
