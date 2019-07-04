const loopback = require('loopback')
const boot = require('loopback-boot')

const app = module.exports = loopback()
let server

app.use((req, res, next) => {
  const userId = req.headers['user-id']
  if (userId) {
    req.userId = userId
  }
  next()
})

app.start = async () => {
  // start the web server
  server = await app.listen(function () {
    app.emit('started')
    const baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
  return server
}

app.stop = function () {
  app.scheduledSourceTask.cancel()
  app.scheduleRetryCandidatureTask.cancel()
  server.close()
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start()
  }
})
