const createJWKSMock = require('mock-jwks').default
const getJSON = require('get-json')
const routes = require('./routes/routes')(createJWKSMock, getJSON)

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('./app')(express, cors, bodyParser, routes)

exports.start = () => {
  app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('Auth0-Mock-Server listening on port 3333!')
  })
}
