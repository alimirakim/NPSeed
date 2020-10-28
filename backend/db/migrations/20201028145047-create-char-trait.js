'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CharTraits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      charId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Characters' },
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

    await queryInterface.addConstraint("CharTraits", {
      fields: ["charId", "traitId"],
      type: 'unique',
      customIndex: true,
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CharTraits');
  }
};