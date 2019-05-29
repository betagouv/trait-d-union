module.exports = (app) => {
  app.get('/', (req, res, next) => {
    const utmSource = req.query.utm_source
    const queryParams = utmSource ? `?utm_source=${utmSource}` : ''
    if (isStaging(req) || isLocal(req)) {
      return next()
    }
    res.writeHead(302, {
      'Location': `http://candidat.traitdunion.beta.gouv.fr${queryParams}`
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
