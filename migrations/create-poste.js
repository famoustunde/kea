'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Poste', {
      posteid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libellé: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.INTEGER
      },
      datePublication: {
        type: Sequelize.DATE
      },
      dateExpiration: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Poste');
  }
};