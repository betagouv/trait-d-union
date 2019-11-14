module.exports = (express, cors, bodyParser, routes) => {
  const server = express()

  server.options('*', cors())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  server.post('/oauth/token', routes.postToken)
  server.get('/api/v2/users/:userId', routes.getUser)
  server.post('/api/v2/users', routes.postUser)
  server.get('/.well-known/jwks.json', routes.getJwks)

  return server
}
