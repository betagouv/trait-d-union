const { createServer, registerPlugins } = require('../server')
const configurationService = require('../src/services/configuration-service')

const start = async () => {
  const server = await registerPlugins(await createServer())
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
