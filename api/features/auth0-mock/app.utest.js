const { sinon, expect } = require('../../src/test-utils')

const stubbedServer = {
  options: sinon.stub().returnsThis(),
  use: sinon.stub().returnsThis(),
  get: sinon.spy(),
  post: sinon.spy()
}
const express = () => stubbedServer
const cors = sinon.stub().returns('fakeCorsResult')
const bodyParser = {
  json: sinon.stub().returns('fakeJsonResult'),
  urlencoded: sinon.stub().returns('fakeUrlencodedResult')
}
const routes = {
  postToken: sinon.spy(),
  getUser: sinon.spy(),
  postUser: sinon.spy(),
  getJwks: sinon.spy()
}

const server = require('./app')(express, cors, bodyParser, routes)

describe('app', () => {
  it('should configure cors', () => {
    expect(cors).to.have.been.calledTwice()
    expect(server.options).to.have.been.calledWith('*', 'fakeCorsResult')
    expect(server.use).to.have.been.calledWith('fakeCorsResult')
  })

  it('should configure bodyParser', () => {
    expect(bodyParser.json).to.have.been.calledOnce()
    expect(bodyParser.urlencoded).to.have.been.calledOnce()
    expect(server.use).to.have.been.calledWith('fakeJsonResult')
    expect(server.use).to.have.been.calledWith('fakeUrlencodedResult')
  })

  it('should define a route to getting a token with a POST', () => {
    expect(server.post).to.have.been.calledWith('/oauth/token', routes.postToken)
  })

  it('should define a route to getting user info with a GET', () => {
    expect(server.get).to.have.been.calledWith('/api/v2/users/:userId', routes.getUser)
  })

  it('should define a route to create a user with a POST', () => {
    expect(server.post).to.have.been.calledWith('/api/v2/users', routes.postUser)
  })

  it('should define a route to getting JSON Web Key Set with a GET', () => {
    expect(server.get).to.have.been.calledWith('/.well-known/jwks.json', routes.getJwks)
  })
})
