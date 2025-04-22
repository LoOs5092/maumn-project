'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = new Date();
        const defaultSchool = {
            school_name: 'مدرسة إفتراضية',
            address: 'لايوجد',
            phone_number: '0000000000',
            createdAt: now,
            updatedAt: now
        };
        return queryInterface.bulkInsert('schools', [defaultSchool], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('schools', { school_name: 'مدرسة إفتراضية' }, {});
    }
};