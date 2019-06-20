const { error } = require('../../infrastructure/logger')

module.exports = async ({ Candidat }, candidat) => {
  if (candidat.id === '') {
    delete candidat.id
  }
  return Candidat.create(candidat).catch(err => {
    error(`Error while creating Candidat ${candidat.id} - ${err}`)
  })
}
