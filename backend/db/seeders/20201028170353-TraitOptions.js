'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("TraitOptions", [
      { traitId: 1, option: "human" },
      { traitId: 1, option: "elf" },
      { traitId: 1, option: "dwarf" },
      { traitId: 1, option: "halfling" },
      { traitId: 1, option: "gnome" },
      { traitId: 1, option: "dragonborn" },
      { traitId: 2, option: "child" },
      { traitId: 2, option: "adult" },
      { traitId: 2, option: "elder" },
      { traitId: 3, option: "boy" },
      { traitId: 3, option: "girl" },
      { traitId: 3, option: "neutral" },
      { traitId: 3, option: "fluid" },
      { traitId: 4, option: "fighter" },
      { traitId: 4, option: "noble" },
      { traitId: 4, option: "peasant" },
      { traitId: 4, option: "merchant" },
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
    await queryInterface.bulkDelete('TraitOptions', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
