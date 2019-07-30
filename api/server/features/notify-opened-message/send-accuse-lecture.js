const { debug } = require('../../infrastructure/logger')

module.exports = ({ smtpApiClient }) => async (candidature) => {
  const candidat = candidature.candidat()
  const offre = candidature.offre().data

  debug(`Sending email to notify candidat (${candidat.nomPrenom} - ${candidat.email}) about CV opening (Offre ${offre.intitule})`)
  return smtpApiClient.sendTransacEmail({
    templateId: 64,
    to: [{ name: candidat.nomPrenom, email: candidat.email }],
    params: {
      Titre_offre: offre.intitule
    },
    tags: [`Notification_ouverture_cv${process.env.APP_ENV === 'staging' ? '_Staging' : ''}`]
  })
}
