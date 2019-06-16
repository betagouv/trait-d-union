const Slack = require('node-slack')
const slackHookUrl = process.env.SLACK_HOOK_URL

module.exports = ({ username = `Trait d'Union`, text }) => {
  const slack = new Slack(slackHookUrl)
  return slack.send({
    text,
    username,
    channel: '#startup-tu-notif',
    icon_emoji: ':robot_face:'
  })
}
