const { sinon, expect } = require('../../../tests/test-utils')
const subscribeCandidateToMailingContactLists = require('./subscribe-candidate-to-mailing-contact-lists')

describe('Subscribe Candidate to mailing contacts list', () => {
  const candidate = {
    email: 'dummy@email.fr',
    telephone: '0612345678',
    nomPrenom: 'Nom Prénom',
    cvUrl: 'https://link.to/cv'
  }

  it('create contact on SendInBlue API', async () => {
    const contactsApiClient = {
      createContact: sinon.spy(async () => {
      })
    }

    await subscribeCandidateToMailingContactLists({ contactsApiClient }, candidate)

    expect(contactsApiClient.createContact).to.have.been.calledWith({
      email: 'dummy@email.fr',
      attributes: {
        SMS: '0612345678',
        NOM_COMPLET: 'Nom Prénom',
        URL_CV: 'https://link.to/cv'
      },
      listIds: [23]
    })
  })

  context('when SendInBlue API encounters an error', () => {
    it('continues', async () => {
      const contactsApiClient = {
        createContact: sinon.spy(async () => {
          throw new Error('SendInBlue API error')
        })
      }

      const result = await subscribeCandidateToMailingContactLists({ contactsApiClient }, candidate)
      expect(result).to.eql(undefined)
    })
  })
})
