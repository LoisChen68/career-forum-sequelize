'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Answers', 'questionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Questions',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Answers', 'questionId')
  }
};