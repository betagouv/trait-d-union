const niveauxEtude = require('../../src/models/enums/niveaux-etude')
const replaceEnum = require('sequelize-replace-enum-postgres').default

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await replaceEnum({
      queryInterface,
      tableName: 'candidats',
      columnName: 'niveauEtude',
      newValues: niveauxEtude,
      enumName: 'enum_candidats_niveauEtude'
    })
    await queryInterface.renameColumn('candidats',
      'name',
      'firstName')
    await queryInterface.addColumn(
      'candidats',
      'lastName', {
        type: Sequelize.STRING,
        allowNull: true
      })
    await queryInterface.addColumn(
      'candidats',
      'zipCode', {
        type: Sequelize.STRING,
        allowNull: true
      })
    await queryInterface.addColumn(
      'candidats',
      'poleEmploiId', {
        type: Sequelize.STRING,
        allowNull: true
      })
    await queryInterface.addColumn(
      'candidats',
      'phoneNumber', {
        type: Sequelize.STRING,
        allowNull: true
      })
    await queryInterface.addColumn(
      'candidats',
      'age', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    await queryInterface.addColumn(
      'candidats',
      'otherJobs', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    await queryInterface.addColumn(
      'candidats',
      'acceptFollowingTraining', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      })
  },

  down: async (queryInterface, Sequelize) => {
    await replaceEnum({
      queryInterface,
      tableName: 'candidats',
      columnName: 'niveauEtude',
      newValues: ['bac'],
      defaultValue: 'bac',
      enumName: 'enum_candidats_niveauEtude'
    })
    await queryInterface.removeColumn('candidats', 'lastName')
    await queryInterface.removeColumn('candidats', 'zipCode')
    await queryInterface.removeColumn('candidats', 'poleEmploiId')
    await queryInterface.removeColumn('candidats', 'phoneNumber')
    await queryInterface.removeColumn('candidats', 'age')
    await queryInterface.removeColumn('candidats', 'otherJobs')
    await queryInterface.removeColumn('candidats', 'acceptFollowingTraining')
    await queryInterface.renameColumn('candidats',
      'firstName',
      'name')
  }
}
