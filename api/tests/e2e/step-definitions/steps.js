const app = require('../../../server/server')
const { BeforeAll, AfterAll, Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const path = require('path')
const got = require('got')
const Joi = require('joi')

const applicationBaseUrl = 'http://localhost:3000/api/v0'
let response
let server

BeforeAll(async () => {
  server = await app.start()
  await app.seeder.migrateAll()
})

AfterAll(() => {
  server.close()
})

Given('No formation are seed', async () => {
  await app.models.Formation.destroyAll()
})

Given(/^Formations are seed from '(.*)'$/, async (seedFile) => {
  await app.seeder.migrate('Formation', 1)
})

When(/^GET '(\/[\S-.?=/]+)'$/, async (route) => {
  response = await got(`${applicationBaseUrl}${route}`, {
    json: true,
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
  const filePath = path.join(process.cwd(), 'features/', payloadFilename)
  const expectedPayload = require(filePath)
  expect(response.body).to.eql(expectedPayload)
})

Then('response payload is', (payload) => {
  expect(response.body).to.eql(JSON.parse(payload))
})
