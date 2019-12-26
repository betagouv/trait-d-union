const flatten = require('../../utils/flatten-array')
const removeDuplicates = require('../../utils/remove-duplicates')
const wait = require('../../infrastructure/wait')(process.env.NODE_ENV === 'e2e' || process.env.NODE_ENV === 'test' ? 1 : 1000)
const executePromisesSequentially = require('../../infrastructure/execute-promise-sequentially')(wait)

const computeCourrielFromContact = require('./compute-courriel-from-contact')

const maxCodesROMEPerRequest = 1

module.exports = ({ poleEmploiApiService }) => {
  return {
    getOffres: async (codesROME, departement) => {
      const searchOffres = createSearchOffres(poleEmploiApiService, departement)
      const groupedCodesROME = groupCodesROME(codesROME, maxCodesROMEPerRequest)

      const allOffres = await executePromisesSequentially(groupedCodesROME, searchOffres)
      const offres = flatten(allOffres)
      return removeDuplicates(offres).map(sanitizeOffre)
    }
  }
}

function groupCodesROME (codesROME, groupSize) {
  return codesROME.slice(groupSize).reduce((result, codeROME) => {
    const currentGroup = result[result.length - 1]
    if (currentGroup.length < groupSize) {
      currentGroup.push(codeROME)
    } else {
      result.push([codeROME])
    }
    return result
  }, [codesROME.slice(0, groupSize)])
}

const createSearchOffres = (poleEmploiApiService, departement) => async (codesROME) => {
  const searchParameters = {
    codeROME: codesROME.join(','),
    departement,
    range: '1-149',
    sort: 2
  }
  const { resultats } = await poleEmploiApiService.request('/offresdemploi/v2/offres/search', searchParameters)
  return resultats
}

function sanitizeOffre (offre) {
  const properties = [
    'id', 'description', 'dureeTravailLibelle', 'secteurActiviteLibelle', 'lieuTravail', 'intitule', 'romeCode',
    'appellationlibelle', 'salaire', 'permis', 'natureContrat', 'typeContrat', 'contact', 'typeContratLibelle'
  ]
  const result = keepDefinedProperties(offre, properties)
  result.source = 'pole-emploi'
  result.codeROME = offre.romeCode
  result.url = offre.origineOffre && offre.origineOffre.urlOrigine
  result.permis = result.permis && [result.permis[0]]
  if (!result.permis) {
    delete result.permis
  }
  const courriel = computeCourrielFromContact(offre.contact)
  if (courriel) {
    result.contact.courriel = courriel
  }
  return result
}

function keepDefinedProperties (object, properties) {
  return properties.reduce((result, property) => {
    if (object[property]) {
      result[property] = object[property]
    }
    return result
  }, {})
}
