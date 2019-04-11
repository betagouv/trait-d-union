const { When, Then } = require('cucumber')
const { expect } = require('chai')
const got = require('got')

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
