module.exports = ({ smtpApiClient }) => async ({ messageId, email }) => {
  const { transactionalEmails } = await smtpApiClient.getTransacEmailsList({ messageId, email })
  const { uuid } = transactionalEmails[0]
  const { events } = await smtpApiClient.getTransacEmailContent(uuid)

  return events.some(event => event.name === 'opened')
}
