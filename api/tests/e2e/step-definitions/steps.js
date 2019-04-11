const { When, Then } = require('cucumber')
const { expect } = require('chai')
const path = require('path')
const got = require('got')
const Joi = require('joi')

const applicationBaseUrl = 'http://localhost:3000/api/v0'
let response

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
