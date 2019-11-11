const Slack = require('node-slack')
const slackHookUrl = process.env.SLACK_HOOK_URL

module.exports = ({ username = 'Trait d\'Union', text }) => {
  if (process.env.TU_FF_NOTIFY_ON_SLACK !== 'on') {
    return
  }
  const slack = new Slack(slackHookUrl)
  return slack.send({
    text,
    username,
    channel: process.env.SLACK_NOTIFICATION_CHANNEL || '#startup-tu-notif',
    icon_emoji: ':robot_face:'
  })
}
