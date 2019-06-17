const { error } = require('../../infrastructure/logger')

module.exports = async ({ Candidat }, candidat) => {
  return Candidat.create(candidat).catch(err => {
    error(`Error while creating Candidat ${candidat.id} - ${err}`)
  })
}
