module.exports = ({ smtpApiClient }) => async ({ offre, candidat }) => {
  return smtpApiClient.sendTransacEmail({
    templateId: 65,
    to: [{ name: candidat.nomPrenom, email: candidat.email }],
    params: {
      Titre_offre: offre.intitule
    },
    tags: [`Notification_envoi_cv${process.env.APP_ENV === 'staging' ? '_Staging' : ''}`]
  })
}
