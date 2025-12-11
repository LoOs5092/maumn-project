'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('users');
      if (!tableInfo.firebase_uid) {
        await queryInterface.addColumn('users', 'firebase_uid', {
          type: Sequelize.STRING(128),
          allowNull: true,
          unique: true,
          after: 'school_id'
        });
      }
    } catch (error) {
      // If table doesn't exist, we skip this migration.
      // The table will be created by sequelize.sync() with the correct schema (including firebase_uid).
      console.log('Skipping migration for users table because it does not exist yet.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      const tableInfo = await queryInterface.describeTable('users');
      if (tableInfo.firebase_uid) {
        await queryInterface.removeColumn('users', 'firebase_uid');
      }
    } catch (error) {
      // Ignore if table doesn't exist
    }
  }
};