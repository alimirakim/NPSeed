'use strict';

const trait = require("../models/trait");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TraitOptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      traitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Traits' },
      },
      option: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: trait,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TraitOptions');
  }
};