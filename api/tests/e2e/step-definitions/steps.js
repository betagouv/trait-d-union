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
let server

BeforeAll(async () => {
  server = await app.start()
  const { port, address } = server.address()
  applicationBaseUrl = `http://${address}:${port}/api/v0`
})

AfterAll(() => {
  server.close()
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
  expect(JSON.parse(response.body)).to.eql(expectedPayload)
})

Then('response payload is', (payload) => {
  expect(JSON.parse(response.body)).to.eql(JSON.parse(payload))
})

Then(/^response payload is text equals to '(.*)'$/, (payloadFilename) => {
  const filePath = path.join(process.cwd(), 'tests/e2e', payloadFilename)
  const expectedPayload = fs.readFileSync(filePath, { encoding: 'utf8' })

  expect(response.body).to.equal(expectedPayload)
})
