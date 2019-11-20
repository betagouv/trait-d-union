const contractTypeDefault = 'cdi'
const contractTypes = ['cdi', 'cdd-court', 'cdd-long', 'autre']

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offres', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jobDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jobAdditionalInfo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      codeROME: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contractType: {
        type: Sequelize.ENUM(contractTypes),
        validate: { isIn: contractTypes },
        alllowNull: false,
        defaultValue: contractTypeDefault
      },
      salary: {
        type: Sequelize.STRING,
        allowNull: true
      },
      jobDuration: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pmsmpDuration: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pmsmpDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offres')
  }
}
