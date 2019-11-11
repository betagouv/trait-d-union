const sourceOffres = require('../features/offres/source-offres')
const formatOffre = require('../features/offres/format-offre')
const setOffresCandidaturesStatus = require('../features/offres/set-offres-candidatures-status')

module.exports = (Offre) => {
  Offre.getContacts = () => getContacts()
  Offre.sourceOffres = () => sourceOffres({ Offre })

  Offre.remoteMethod('sourceOffres', {
    http: { path: '/source', verb: 'POST' },
    returns: { arg: 'offres', type: 'string', root: true }
  })

  Offre.remoteMethod('getContacts', {
    http: { path: '/contacts', verb: 'GET' },
    returns: { arg: 'contacts', type: 'string', root: true }
  })

  Offre.afterRemote('find', async (context) => {
    if (context.result) {
      context.result = context.result.map(formatOffre).filter(offreIsAvailable)

      if (context.req.userId) {
        context.result = await setOffresCandidaturesStatus(Offre.app.models, { offres: context.result, userId: context.req.userId })
      }
    }
  })

  Offre.afterRemote('findById', async (context) => {
    if (context.result) {
      context.result = formatOffre(context.result)
    }
  })

  async function getContacts () {
    const offres = await Offre.find()
    const allContacts = offres.map(({ data }) => data.contact)
    return uniqueArray(allContacts)
  }

  function uniqueArray (arrayOfObjects) {
    return arrayOfObjects.filter((object, index) => index === arrayOfObjects.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))
  }
}

const offreIsAvailable = ({ status }) => !status || status === 'available'
