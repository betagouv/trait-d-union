const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')

chai.should()
chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(dirtyChai)
exports.expect = expect
exports.sinon = sinon
