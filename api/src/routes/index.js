const { recursiveReadDirSync } = require('../utils')

module.exports = recursiveReadDirSync(__dirname)
  .filter((filename) => !filename.startsWith('.'))
  .filter((filename) => filename.endsWith('-route.js'))
  .map((routeFile) => require(routeFile))
  .map(({ createRoute }) => createRoute('/api/v1'))
  .reduce((all, routes) => all.concat(routes), [])
  .map((route) => {
    route.handler = _buildHandler(route.handler)
    return route
  })

function _buildHandler (handler) {
  return (request, h) => handler(request, h)
}
