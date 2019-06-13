const app = require('../../../server/server')
const { BeforeAll, AfterAll, Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const path = require('path')
const fs = require('fs')
const got = require('got')
const Joi = require('joi')
const loadReferentiels = require('../../../server/features/referentiels/load-referentiels')
let applicationBaseUrl
let response

BeforeAll(async () => {
  const server = await app.start()
  const { port, address } = server.address()
  applicationBaseUrl = `http://${address}:${port}/api/v0`
})

AfterAll(() => {
  app.stop()
})

Given(/^Referentiel is seed from '(.*)'$/, async (referentielsPath) => {
  await app.datasources.db.automigrate()
  const referentiels = require(path.join(process.cwd(), 'tests/e2e/referentiels/', referentielsPath))
  return loadReferentiels(app.models, referentiels)
})

Given('No session formation is seed', async () => {
  await app.models.SessionFormation.destroyAll()
})

When(/^GET '(\/[\S-.?=/]+)'$/, async (route) => {
  response = await got(`${applicationBaseUrl}${route}`, {
    throwHttpErrors: false
  })
})

When(/^POST '(\/[\S-.?=/]+)'$/, async (route) => {
  response = await got.post(`${applicationBaseUrl}${route}`, {
    throwHttpErrors: false
  })
})

When(/^POST '(\/[\S-.?=/]+)' with payload$/, async (route, payload) => {
  response = await got.post(`${applicationBaseUrl}${route}`, {
    throwHttpErrors: false,
    json: true,
    body: JSON.parse(payload)
  })
})

When(/^POST '(\/[\S-.?=/]+)' with payload from '(.*)'$/, async (route, payloadFilename) => {
  const filePath = path.join(process.cwd(), 'tests/e2e', payloadFilename)
  const payload = require(filePath)

  response = await got.post(`${applicationBaseUrl}${route}`, {
    throwHttpErrors: false,
    json: true,
    body: payload
  })
})

Then(/^http status is (.*)$/, async (status) => {
  expect(response.statusCode).to.eql(parseInt(status))
})

Then(/^response payload conforms to '(.*)'$/, (schemaName) => {
  const schemasIndex = path.join(process.cwd(), 'tests/e2e/schemas')
  const schemas = require(schemasIndex)
  const schema = schemas[`${schemaName}`]
  const { error } = Joi.validate(response.body, schema)
  expect(error).to.eql(null)
})

Then(/^response payload is '(.*)'$/, (payloadFilename) => {
  const filePath = path.join(process.cwd(), 'tests/e2e', payloadFilename)
  const expectedPayload = require(filePath)
  let responseBody = response.body
  try {
    responseBody = JSON.parse(response.body)
  } catch (error) {
  }
  expect(responseBody).to.eql(expectedPayload)
})

Then('response payload is', (payload) => {
  let responseBody = response.body
  try {
    responseBody = JSON.parse(response.body)
  } catch (error) {
  }
  expect(responseBody).to.eql(JSON.parse(payload))
})

Then(/^response payload is text equals to '(.*)'$/, (payloadFilename) => {
  const filePath = path.join(process.cwd(), 'tests/e2e', payloadFilename)
  const expectedPayload = fs.readFileSync(filePath, { encoding: 'utf8' })

  expect(response.body).to.equal(expectedPayload)
})
