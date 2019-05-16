module.exports = (app) => {
  app.get('/', (req, res) => {
    const utmSource = req.query.utm_source
    const queryParams = utmSource ? `?utm_source=${utmSource}` : ''
    res.writeHead(302, {
      'Location': `http://candidat.traitdunion.beta.gouv.fr${queryParams}`
    })
    res.end()
  })
}
