const { createServer, registerPlugins } = require('../server')
const configurationService = require('../src/services/configuration-service')

const start = async () => {
  const server = await registerPlugins(await createServer())
  if (configurationService.get('E2E_TEST')) {
    const auth0Mock = require('../features/auth0-mock')
    server.logger().info('E2E_TEST Mode activated -> every API v1 calls are mocked!')
    auth0Mock.start()
  }
  await server.start()
}

if (process.argv.includes('-h')) {
  const help = configurationService.helpString()
  // eslint-disable-next-line no-console
  console.log(help)
  process.exit(0)
}

start()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit(1)
  })
