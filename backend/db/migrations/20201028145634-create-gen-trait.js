'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GenTraits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      genId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Generators' },
      },
      traitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Traits' },
      },
      traitOptionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'TraitOptions' },
      },
      odds: {
        type: Sequelize.FLOAT,
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
    })

    await queryInterface.addConstraint("GenTraits", {
      fields: ["genId", "traitOptionId"],
      type: 'unique',
      customIndex: true,
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GenTraits');
  }
};