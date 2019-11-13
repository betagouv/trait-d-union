exports.configure = (queryInterface) => {
  const { username, password, port, database, host } = queryInterface.QueryGenerator.options
  process.env.DATABASE_URL = `postgres://${username}:${password}@${host}:${port || 5432}/${database}?ssl=false`
}
