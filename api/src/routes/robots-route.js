module.exports.createRoute = () => ({
  path: '/robots.txt',
  method: 'GET',
  config: { auth: false },
  handler: (request, h) => {
    const robotText = 'User-agent: *\nDisallow: /'
    return h.response(robotText).type('text/plain')
  }
})
