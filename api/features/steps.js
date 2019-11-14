const { setDefaultTimeout, Given, When, Then } = require('cucumber')
const got = require('got')
const { expect } = require('chai')
const path = require('path')
const configurationService = require('../src/services/configuration-service')
const auth0Service = require('./auth0-service')
const Joi = require('@hapi/joi')

setDefaultTimeout(30 * 1000)

let response
const applicationBaseUrl = `http://${configurationService.get('HOST_NAME')}`

let userToken

Given('User is not authenticated', () => {
  userToken = null
})

Given('I am not an existing user', async () => {
  userToken = await auth0Service.authenticateUser('none@e2e.fr')
})

Given(/^I am an authenticated user with email '(.*)'$/, async (email) => {
  userToken = await auth0Service.authenticateUser(email)
})

When(/^GET '(\/[\S-.?=/]+)'$/, async (route) => {
  response = await got(`${applicationBaseUrl}/api/v1${route}`, {
    json: true,
    headers: { authorization: `Bearer ${userToken}` },
    throwHttpErrors: false
  })
})

When(/^PUT '(\/[\S-.?=/]+)' with payload$/, async (route, payload) => {
  response = await got.put(`${applicationBaseUrl}/api/v1${route}`, {
    throwHttpErrors: false,
    json: true,
    body: JSON.parse(payload),
    headers: { authorization: `Bearer ${userToken}` }
  })
})

When(/^POST '(\/[\S-.?=/]+)' with payload$/, async (route, payload) => {
  response = await got.post(`${applicationBaseUrl}/api/v1${route}`, {
    throwHttpErrors: false,
    json: true,
    body: JSON.parse(payload),
    headers: { authorization: `Bearer ${userToken}` }
  })
})

Then(/^http status is (.*)$/, async (status) => {
  expect(response.statusCode).to.eql(parseInt(status))
})

Then(/^http status not (.*)$/, async (status) => {
  expect(response.statusCode).to.not.eql(parseInt(status))
})

Then('response payload is', (payload) => {
  expect(response.body).to.eql(JSON.parse(payload))
})

Then('response payload without timestamps is', (payload) => {
  const bodyWithoutTimestamps = response.body.map((item) => {
    delete item.createdAt
    delete item.updatedAt
    return item
  })

  expect(bodyWithoutTimestamps).to.eql(JSON.parse(payload))
})

Then(/^response payload is '(.*)'$/, (payloadFilename) => {
  const filePath = path.join(process.cwd(), 'features/', payloadFilename)
  const expectedPayload = require(filePath)
  expect(response.body).to.eql(expectedPayload)
})

Then(/^response payload array is '(.*)'$/, (payloadFilename) => {
  const filePath = path.join(process.cwd(), 'features/', payloadFilename)
  const expectedPayload = require(filePath)
  const bodyWithoutTimestamps = response.body.map((item) => {
    delete item.createdAt
    delete item.updatedAt
    return item
  })

  expect(bodyWithoutTimestamps).to.eql(expectedPayload)
})

Then(/^response payload conforms to '(.*)'$/, (schemaName) => {
  const schemasIndex = path.join(process.cwd(), 'src/schemas')
  const schemas = require(schemasIndex)
  const schema = schemas[`${schemaName}`]
  const { error } = schema.validate(response.body)
  expect(error).to.eql(undefined)
})

Then(/^returned response headers contains location '(.*)'$/, (location) => {
  const locationHeader = response.headers.location
  const { error } = Joi.string().required()
    .validate(locationHeader)
  expect(error).to.eql(undefined)
  expect(locationHeader).to.contains(location)
})
