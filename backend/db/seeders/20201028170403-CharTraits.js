'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    await queryInterface.bulkInsert("CharTraits", [
      {charId: 1, traitId: 1, traitOptionId: 1},
      {charId: 1, traitId: 2, traitOptionId: 8},
      {charId: 1, traitId: 3, traitOptionId: 10},
      {charId: 1, traitId: 4, traitOptionId: 14},
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CharTraits', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
