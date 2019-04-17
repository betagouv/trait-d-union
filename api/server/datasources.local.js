module.exports = {
  db: {
    name: 'db',
    connector: 'postgresql',
    url: process.env.DATABASE_URL
    // "postgres://trait:dunion@db:5432/traitdunion-database"
  }
}
