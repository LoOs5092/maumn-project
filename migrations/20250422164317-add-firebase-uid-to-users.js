'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('users');
    if (!tableInfo.firebase_uid) {
      await queryInterface.addColumn('users', 'firebase_uid', {
        type: Sequelize.STRING(128),
        allowNull: true,
        unique: true,
        after: 'school_id'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('users');
    if (tableInfo.firebase_uid) {
      await queryInterface.removeColumn('users', 'firebase_uid');
    }
  }
};