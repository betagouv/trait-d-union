const { sinon, expect } = require('../../../tests/test-utils')
const createSendCandidatureEmail = require('./send-candidature-email')

describe('Send Candidature email', () => {
  const smtpApiClient = {
    sendTransacEmail: sinon.spy(async () => ({ messageId: 'messageId' }))
  }
  const sendCandidatureEmail = createSendCandidatureEmail({ smtpApiClient })
  const candidatureId = 'candidature_id'
  const offre = {
    id: 'offreId',
    intitule: 'Titre offre',
    contact: {
      nom: 'Employeur',
      courriel: 'contact@courriel.fr'
    }
  }
  const candidat = {
    id: '71854445-1512-47b1-bc6d-e0491e764a51',
    email: 'an_account@example.com',
    nomPrenom: 'Lorem ipsum dolor Nom Prenom',
    telephone: 'Lorem ipsum dolor Phone',
    age: 45,
    cvUrl: 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'
  }

  beforeEach(() => {
    smtpApiClient.sendTransacEmail.resetHistory()
  })

  context('when destinataire is a corporate', () => {
    it('sends email to corporate', async () => {
      candidat.cvUrl = 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'

      await sendCandidatureEmail({ offre, candidat, candidatureId })

      expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
        'templateId': 52,
        'to': [{ 'name': offre.contact.nom, 'email': 'contact@courriel.fr' }],
        'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
        'params': {
          'Titre_offre': 'Titre offre',
          'id_offre': offre.id,
          'Nom_prenom': candidat.nomPrenom,
          'URL_CV': candidat.cvUrl,
          'Age': candidat.age,
          'Telephone': candidat.telephone,
          'id_candidature': candidatureId,
          'email_candidat': candidat.email
        },
        'attachment': [{ 'url': 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' }],
        tags: ['Candidature_DE']
      })
    })
    context('when the environment is Staging', () => {
      beforeEach(() => {
        process.env.APP_ENV = 'staging'
      })
      afterEach(() => {
        process.env.APP_ENV = 'production'
      })
      it('sends email to corporate with correct tags', async () => {
        candidat.cvUrl = 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'

        await sendCandidatureEmail({ offre, candidat, candidatureId })

        expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
          'templateId': 52,
          'to': [{ 'name': offre.contact.nom, 'email': 'contact@courriel.fr' }],
          'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
          'params': {
            'Titre_offre': 'Titre offre',
            'id_offre': offre.id,
            'Nom_prenom': candidat.nomPrenom,
            'URL_CV': candidat.cvUrl,
            'Age': candidat.age,
            'Telephone': candidat.telephone,
            'id_candidature': candidatureId,
            'email_candidat': candidat.email
          },
          'attachment': [{ 'url': 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' }],
          tags: ['Candidature_DE_Staging']
        })
      })
    })
    it('normalizes the CV url', async () => {
      candidat.cvUrl = 'https://fileAvéDesAccents.àzut.éù'

      await sendCandidatureEmail({ offre, candidat, candidatureId })

      expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
        'templateId': 52,
        'to': [{ 'name': offre.contact.nom, 'email': 'contact@courriel.fr' }],
        'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
        'params': {
          'Titre_offre': 'Titre offre',
          'id_offre': offre.id,
          'Nom_prenom': candidat.nomPrenom,
          'URL_CV': 'https://fileAveDesAccents.azut.eu',
          'Age': candidat.age,
          'Telephone': candidat.telephone,
          'id_candidature': candidatureId,
          'email_candidat': candidat.email
        },
        'attachment': [{ 'url': 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' }],
        tags: ['Candidature_DE']
      })
    })
    it('returns messageId of message sent', async () => {
      const messageId = await sendCandidatureEmail({ offre, candidat, candidatureId })

      expect(messageId).to.eql('messageId')
    })
    context('when email is a retry', () => {
      it('sends email with retry template', async () => {
        candidat.cvUrl = 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'

        await sendCandidatureEmail({ offre, candidat, candidatureId, retry: true })

        expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
          'templateId': 62,
          'to': [{ 'name': offre.contact.nom, 'email': 'contact@courriel.fr' }],
          'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
          'params': {
            'Titre_offre': 'Titre offre',
            'id_offre': offre.id,
            'Nom_prenom': candidat.nomPrenom,
            'URL_CV': candidat.cvUrl,
            'Age': candidat.age,
            'Telephone': candidat.telephone,
            'id_candidature': candidatureId,
            'email_candidat': candidat.email
          },
          'attachment': [{ 'url': 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' }],
          tags: ['Relance_Candidature_DE']
        })
      })
    })
  })

  context('when destinataire is a Pole Emploi', () => {
    it('sends email to Pole Emploi', async () => {
      candidat.cvUrl = 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'

      const offrePoleEmploi = {
        intitule: 'Titre offre',
        contact: {
          nom: 'Conseiller PE',
          courriel: 'contact@pole-emploi.fr'
        }
      }

      await sendCandidatureEmail({ offre: offrePoleEmploi, candidat, candidatureId })

      expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
        'templateId': 53,
        'to': [{ 'name': offrePoleEmploi.contact.nom, 'email': 'contact@pole-emploi.fr' }],
        'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
        'params': {
          'Titre_offre': 'Titre offre',
          'id_offre': offrePoleEmploi.id,
          'Nom_prenom': candidat.nomPrenom,
          'URL_CV': candidat.cvUrl,
          'Age': candidat.age,
          'Telephone': candidat.telephone,
          'id_candidature': candidatureId,
          'email_candidat': candidat.email
        },
        'attachment': [
          { 'url': 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' },
          { 'url': candidat.cvUrl }
        ],
        tags: ['Candidature_DE']
      })
    })
    context('when email is a retry', () => {
      it('sends email with retry template', async () => {
        candidat.cvUrl = 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'

        const offrePoleEmploi = {
          intitule: 'Titre offre',
          contact: {
            nom: 'Conseiller PE',
            courriel: 'contact@pole-emploi.fr'
          }
        }

        await sendCandidatureEmail({ offre: offrePoleEmploi, candidat, candidatureId, retry: true })

        expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
          'templateId': 63,
          'to': [{ 'name': offrePoleEmploi.contact.nom, 'email': 'contact@pole-emploi.fr' }],
          'replyTo': { 'name': candidat.nomPrenom, 'email': candidat.email },
          'params': {
            'Titre_offre': 'Titre offre',
            'id_offre': offrePoleEmploi.id,
            'Nom_prenom': candidat.nomPrenom,
            'URL_CV': candidat.cvUrl,
            'Age': candidat.age,
            'Telephone': candidat.telephone,
            'id_candidature': 'candidature_id',
            'email_candidat': candidat.email
          },
          'attachment': [
            { 'url': 'https://labonneformation.pole-emploi.fr/pdf/cerfa_13912-04.pdf' },
            { 'url': candidat.cvUrl }
          ],
          tags: ['Relance_Candidature_DE']
        })
      })
    })
  })
})
