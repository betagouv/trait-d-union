const express = require('express')
const favicon = require('express-favicon')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

app.get('/*', (req, res, next) => {
  const receivedUrl = `${req.protocol}://${req.hostname}:${port}${req.url}`

  if (req.get('X-Forwarded-Proto') === 'http') {
    const redirectTo = `https://${req.hostname}${req.url}`
    console.log(`${new Date()} Redirecting ${receivedUrl} --> ${redirectTo}`)
    res.redirect(301, redirectTo)
  } else {
    next()
  }
})

app.use(favicon(__dirname + '/build/favicon.ico'))
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port)
