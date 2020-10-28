'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("GenTraits", [
      { genId: 2, traitId: 1, traitOptionId: 1, odds: 0.5 },
      { genId: 2, traitId: 1, traitOptionId: 2, odds: 0.1 },
      { genId: 2, traitId: 1, traitOptionId: 3, odds: 0.1 },
      { genId: 2, traitId: 1, traitOptionId: 4, odds: 0.1 },
      { genId: 2, traitId: 1, traitOptionId: 5, odds: 0.1 },
      { genId: 2, traitId: 1, traitOptionId: 6, odds: 0.1 },
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
    await queryInterface.bulkDelete('GenTraits', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
