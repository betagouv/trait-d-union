const createFindOffres = require('./find-offres')

const { info } = require('../../infrastructure/logger')
const cache = require('../../infrastructure/cache')
const apiConfiguration = require('../../infrastructure/api-configuration')
const poleEmploiApiService = require('../../repositories/pole-emploi-api-service')({ apiConfiguration, cache })
const offresRepository = require('../../repositories/pole-emploi-offres/offres-pole-emploi-repository')({ poleEmploiApiService })

module.exports = async ({ Offre }) => {
  const findOffres = createFindOffres(Offre.app.models, [offresRepository])
  const result = await findOffres({ around: {} })
  const offresWithEmailCount = countOffresWithEmail(result)
  info(`Source ${result.length} offres, ${offresWithEmailCount} offres with email`)
  info('Destroy current offres')
  await destroyOffres(Offre)
  info('Store newly sourced offres')
  await persistOffres(Offre, result)
  return result
}

function countOffresWithEmail (offres) {
  const result = offres.filter(({ contact }) => contact && contact.courriel)
  return result.length
}

async function persistOffres (Offre, offres) {
  const createOffrePromises = offres.map(offre => Offre.create({ id: offre.id, data: offre }))
  return Promise.all(createOffrePromises)
}

async function destroyOffres (Offre) {
  return Offre.destroyAll()
}
