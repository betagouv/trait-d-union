const { info, error } = require('../../infrastructure/logger')

module.exports = async ({ Candidat }) => {
  info('Creating fake candidat for testing purpose')
  return Candidat.create(fakeCandidat).catch(err => error(`Error while creating fake candidat: ${err}`))
}

const fakeCandidat = {
  id: '71854445-1512-47b1-bc6d-e0491e764a54',
  email: 'fake-candidat@yopmail.fr',
  nomPrenom: 'Je suis Fake',
  telephone: '0612345678',
  cvUrl: 'https://www.mon-cv.fr/fichier.pdf'
}
