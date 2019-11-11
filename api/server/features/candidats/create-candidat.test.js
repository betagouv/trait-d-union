const { expect, sinon } = require('../../../tests/test-utils')
const createCandidat = require('./create-candidat')

describe('Create Candidat from form response (typeform webhook)', () => {
  const candidat = {
    id: '71854445-1512-47b1-bc6d-e0491e764a51',
    email: 'an_account@example.com',
    nomPrenom: 'Lorem ipsum dolor Nom Prenom',
    telephone: 'Lorem ipsum dolor Phone',
    cvUrl: 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'
  }
  const Candidat = {
    create: sinon.spy(async () => ({}))
  }

  it('creates Candidat in DB', async () => {
    await createCandidat({ Candidat }, candidat)

    expect(Candidat.create).to.have.been.calledWith(candidat)
  })

  context('when candidat id is empty', () => {
    const candidat = {
      id: '',
      email: 'an_account@example.com',
      nomPrenom: 'Lorem ipsum dolor Nom Prenom',
      telephone: 'Lorem ipsum dolor Phone',
      cvUrl: 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'
    }
    const Candidat = {
      create: sinon.spy(async () => ({}))
    }

    it('creates Candidat in DB', async () => {
      await createCandidat({ Candidat }, candidat)

      expect(Candidat.create).to.have.been.calledWith({
        email: candidat.email,
        nomPrenom: candidat.nomPrenom,
        telephone: candidat.telephone,
        cvUrl: candidat.cvUrl
      })
    })
  })
})
