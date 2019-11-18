module.exports = {
  local: {
    username: 'trait',
    password: 'dunion',
    database: 'traitdunion',
    host: 'localhost',
    port: '5433',
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  'local-e2e': {
    username: 'trait',
    password: 'dunion',
    database: 'traitdunion-e2e',
    host: 'localhost',
    port: '5433',
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    seederStorage: 'sequelize'
  }
}
