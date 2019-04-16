const HttpErrors = require('http-errors')

module.exports = ({ SessionFormation }) => async ({ around }) => {
  const formation = await SessionFormation.find()
  console.log(formation)
  if (formation.length) {
    throw noOffresFoundError()
  }
  throw noFormationFoundError()
}

const noFormationFoundError = () => buildError('no-session-formation-found')
const noOffresFoundError = () => buildError('no-offre-found')

function buildError (errorCode) {
  const error = new HttpErrors.NotFound(errors[errorCode])
  error.code = errorCode
  return error
}

const errors = {
  'no-session-formation-found': 'Aucune session de formation n\'est disponible. ' +
    'Vérifiez que vous avez bien inséré le PRF en base ou réessayer en changeant de zone géographique.',
  'no-offre-found': 'Aucune offre accessible avec une session de formation ' +
          'n\'a été trouvée dans la zone demandée.'
}
