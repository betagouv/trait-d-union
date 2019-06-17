const createFindOffres = require('./find-offres')

const { info } = require('../../infrastructure/logger')
const cache = require('../../infrastructure/cache')
const apiConfiguration = require('../../infrastructure/api-configuration')
const poleEmploiApiService = require('../../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })

module.exports = async ({ Offre }) => {
  const findOffres = createFindOffres(Offre.app.models, [offresRepository])
  const result = await findOffres({ around: {} })
  const offresWithEmail = keepOffresWithEmail(result)
  info(`Source ${result.length} offres, ${offresWithEmail.length} offres with email`)
  info('Store newly sourced offres')
  await persistOffres(Offre, offresWithEmail)
  info('Delete non received offres')
  await destroyOffres(Offre, offresWithEmail)
  return offresWithEmail
}

function keepOffresWithEmail (offres) {
  return offres.filter(({ contact }) => contact && contact.courriel)
}

async function persistOffres (Offre, offres) {
  const createOffrePromises = offres.map(async (offre) => {
    const existingOffre = await Offre.findById(offre.id)
    if (existingOffre) {
      return existingOffre.updateAttributes({ data: offre })
    } else {
      return Offre.create({ id: offre.id, data: offre })
    }
  })
  return Promise.all(createOffrePromises)
}

async function destroyOffres (Offre, offres) {
  const receivedOffresId = offres.map(({ id }) => id)
  if (process.env.TU_FF_ADD_FAKE_OFFRE === 'on') {
    receivedOffresId.push('fake-offre-id')
  }
  return Offre.destroyAll({ id: { nin: receivedOffresId } })
}
