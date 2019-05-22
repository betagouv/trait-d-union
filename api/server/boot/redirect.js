module.exports = (app) => {
  app.get('/', (req, res, next) => {
    const utmSource = req.query.utm_source
    const queryParams = utmSource ? `?utm_source=${utmSource}` : ''
    const environment = req.hostname.includes('staging') ? 'staging.' : ''
    if (environment === 'staging') {
      return next()
    }
    res.writeHead(302, {
      'Location': `http://candidat.traitdunion.${environment}beta.gouv.fr${queryParams}`
    })
    res.end()
  })
}
