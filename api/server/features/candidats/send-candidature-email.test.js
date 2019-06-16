const { sinon, expect } = require('../../../tests/test-utils')
const sendCandidatureEmail = require('./send-candidature-email')

describe('Subscribe Candidate to mailing contacts list', () => {
  const smtpApiClient = {
    sendTransacEmail: sinon.spy(() => { })
  }
  const offreId = 'offreId'
  const offre = {
    appellationlibelle: 'Titre offre',
    contact: { courriel: 'contact@courriel.fr' }
  }
  const Offre = {
    findById: async () => ({ data: offre })
  }
  const candidat = {
    id: '71854445-1512-47b1-bc6d-e0491e764a51',
    email: 'an_account@example.com',
    nomPrenom: 'Lorem ipsum dolor Nom Prenom',
    telephone: 'Lorem ipsum dolor Phone',
    cvUrl: 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'
  }

  it('returns the offre', async () => {
    const offre = await sendCandidatureEmail({ smtpApiClient, Offre }, offreId, candidat)

    expect(offre).to.eql(offre)
  })

  beforeEach(() => {
    smtpApiClient.sendTransacEmail.resetHistory()
  })

  context('when destinataire is a corporate', () => {
    it('sends email to corporate', async () => {
      await sendCandidatureEmail({ smtpApiClient, Offre }, offreId, candidat)

      expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
        'templateId': 52,
        'bcc': [{ 'email': 'chaib.martinez@beta.gouv.fr' }, { 'email': 'edwina.morize@beta.gouv.fr' }],
        'to': [{ 'email': 'contact@courriel.fr' }],
        'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
        'params': {
          'Titre_offre': 'Titre offre',
          'id_offre': offreId,
          'Nom_prenom': candidat.nomPrenom,
          'URL_CV': candidat.cvUrl,
          'Age': candidat.telephone
        },
        'attachment': [{ 'url': candidat.cvUrl }]
      })
    })
  })
  context('when destinataire is a Pole Emploi', () => {
    it('sends email to Pole Emploi', async () => {
      const offrePoleEmploi = {
        appellationlibelle: 'Titre offre',
        contact: { courriel: 'contact@pole-emploi.fr' }
      }
      const OffrePoleEmploi = {
        findById: async () => ({ data: offrePoleEmploi })
      }

      await sendCandidatureEmail({ smtpApiClient, Offre: OffrePoleEmploi }, offreId, candidat)

      expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
        'templateId': 53,
        'bcc': [{ 'email': 'chaib.martinez@beta.gouv.fr' }, { 'email': 'edwina.morize@beta.gouv.fr' }],
        'to': [{ 'email': 'contact@pole-emploi.fr' }],
        'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
        'params': {
          'Titre_offre': 'Titre offre',
          'id_offre': offreId,
          'Nom_prenom': candidat.nomPrenom,
          'URL_CV': candidat.cvUrl,
          'Age': candidat.telephone
        },
        'attachment': [{ 'url': candidat.cvUrl }]
      })
    })
  })
  context('when offre does not exist', () => {
    it('does not send email at all', async () => {
      const Offre = {
        findById: async () => undefined
      }

      await sendCandidatureEmail({ smtpApiClient, Offre }, offreId, candidat)

      expect(smtpApiClient.sendTransacEmail).to.not.have.been.called()
    })
  })
})
