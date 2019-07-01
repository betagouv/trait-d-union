const createFindOffres = require('./find-offres')

const { info } = require('../../infrastructure/logger')
const cache = require('../../infrastructure/cache')
const apiConfiguration = require('../../infrastructure/api-configuration')
const poleEmploiApiService = require('../../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })
const filterShortTermCDD = require('./filter-short-term-cdd')

module.exports = async ({ Offre }) => {
  const findOffres = createFindOffres(Offre.app.models, [offresRepository])
  const result = await findOffres({ around: {} })
  const offresWithEmail = keepOffresWithEmail(result)
  const longTermeOffres = filterShortTermCDD(offresWithEmail)
  info(`Source ${result.length} offres, ${offresWithEmail.length} offres with email, ${longTermeOffres.length} are cdi or cdd >= 6 mois`)
  info('Store newly sourced offres')
  await persistOffres(Offre, longTermeOffres)
  info('Set non received offres as unavailable')
  await updateOffresAvailabilities(Offre, longTermeOffres)
  if (process.env.TU_FF_ADD_FAKE_DATA === 'on') {
    await updateFakeOffresAvailablities(Offre)
  }
  return longTermeOffres
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

async function updateOffresAvailabilities (Offre, offres) {
  const receivedOffresId = offres.map(({ id }) => id)
  return Offre.updateAll({ id: { nin: receivedOffresId } }, { status: 'unavailable' })
}

async function updateFakeOffresAvailablities (Offre) {
  return Offre.updateAll({ id: { ilike: 'fake-offre-%' } }, { status: 'available' })
}
