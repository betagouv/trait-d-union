module.exports = (app) => {
  app.get('/', (req, res) => {
    res.writeHead(302, {
      'Location': 'http://candidat.traitdunion.beta.gouv.fr'
    })
    res.end()
  })
}
