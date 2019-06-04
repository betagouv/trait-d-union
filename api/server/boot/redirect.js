module.exports = (app) => {
  app.get('/', (req, res, next) => {
    const isCandidat = req.hostname.includes('candidat')
    if (isCandidat) {
      return next()
    }
    const utmSource = req.query.utm_source
    const queryParams = utmSource ? `?utm_source=${utmSource}` : ''
    if (isLocal(req)) {
      return next()
    }
    const environment = isStaging(req) ? 'staging.' : ''
    res.writeHead(302, {
      'Location': `https://${environment}candidat.traitdunion.beta.gouv.fr${queryParams}`
    })
    res.end()
  })
}

function isStaging (req) {
  return req.hostname.includes('staging')
}

function isLocal (req) {
  return req.hostname.includes('localhost')
}
