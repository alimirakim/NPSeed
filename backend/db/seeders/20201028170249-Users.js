'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { username: "admin", email: "almyki@gmail.com", hashword: bcrypt.hashSync("password") },
      { username: "demo", hashword: bcrypt.hashSync("demo") },
      { username: "lucien", hashword: bcrypt.hashSync("lucien") },
      { username: "rosalyn", hashword: bcrypt.hashSync("rosalyn") },
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
    await queryInterface.bulkDelete('Traits', null, {})
    await queryInterface.bulkDelete('TraitOptions', null, {})
    await queryInterface.bulkDelete('CharTraits', null, {})
    await queryInterface.bulkDelete('Characters', null, {})
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
