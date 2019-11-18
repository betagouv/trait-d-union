const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const packageJson = require('../../../package.json')

module.exports = () => async () => {
  const version = packageJson.version
  const [sha1] = await Promise.all([
    _getSha1()
  ])
  return {
    version,
    sha1
  }
}

async function _getSha1 () {
  const sha1 = await readFileAsync(path.join(__dirname, '../../../sha1'), 'utf8')
  return sha1.split('\n')[0]
}
