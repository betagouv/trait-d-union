const { expect, sinon } = require('../../../tests/test-utils')
const createSendAccuseLecture = require('./send-accuse-lecture')

describe('Send accuse lecture email', () => {
  const smtpApiClient = {
    sendTransacEmail: sinon.spy(async () => {
    })
  }
  const offre = {
    id: 'offreId',
    data: {
      intitule: 'Titre offre',
      contact: {
        nom: 'Employeur',
        courriel: 'contact@courriel.fr'
      }
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
  const candidature = {
    offre: () => offre,
    candidat: () => candidat
  }
  const sendAccuseLecture = createSendAccuseLecture({ smtpApiClient })

  it('sends correct template email with info from offre and candidat', async () => {
    await sendAccuseLecture(candidature)

    expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
      templateId: 64,
      to: [{ name: 'Lorem ipsum dolor Nom Prenom', email: 'an_account@example.com' }],
      params: {
        Titre_offre: 'Titre offre'
      },
      tags: ['Notification_ouverture_cv']
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
      await sendAccuseLecture(candidature)

      expect(smtpApiClient.sendTransacEmail).to.have.been.calledWith({
        templateId: 64,
        to: [{ name: 'Lorem ipsum dolor Nom Prenom', email: 'an_account@example.com' }],
        params: {
          Titre_offre: 'Titre offre'
        },
        tags: ['Notification_ouverture_cv_Staging']
      })
    })
  })
})
