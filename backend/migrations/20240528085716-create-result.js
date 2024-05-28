'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resId: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      long: {
        type: Sequelize.STRING
      },
      slant: {
        type: Sequelize.STRING
      },
      reflex: {
        type: Sequelize.STRING
      },
      sign: {
        type: Sequelize.INTEGER
      },
      line: {
        type: Sequelize.INTEGER
      },
      giving: {
        type: Sequelize.INTEGER
      },
      practice: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Results');
  }
};