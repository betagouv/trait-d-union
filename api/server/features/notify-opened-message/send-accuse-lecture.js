module.exports = ({ smtpApiClient }) => async (candidature) => {
  const candidat = candidature.candidat()
  const offre = candidature.offre()

  return smtpApiClient.sendTransacEmail({
    templateId: 64,
    to: [{ name: candidat.nomPrenom, email: candidat.email }],
    params: {
      Titre_offre: offre.intitule
    },
    tags: [`Notification_ouverture_cv${process.env.APP_ENV === 'staging' ? '_Staging' : ''}`]
  })
}
