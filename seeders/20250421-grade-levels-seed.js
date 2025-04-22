'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const now = new Date();

        // 1. Insert parent grades (grade_label is NULL for parent grades)
        const parentGrades = [];
        for (let i = 1; i <= 6; i++) {
            parentGrades.push({
                grade_number: i,
                grade_label: null,
                parent_grade_id: null,
                description: `Grade ${i}`,
                createdAt: now,
                updatedAt: now,
            });
        }
        await queryInterface.bulkInsert('grade_levels', parentGrades, {});

        // 2. Retrieve the inserted parent grades to get their primary keys
        const parents = await queryInterface.sequelize.query(
            `SELECT grade_level_id, grade_number FROM grade_levels WHERE grade_label IS NULL`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        // 3. Insert child grades using the letters أ, ب, ج, د for each parent
        const letters = ['أ', 'ب', 'ج', 'د'];
        const childGrades = [];
        for (const parent of parents) {
            for (const letter of letters) {
                childGrades.push({
                    grade_number: parent.grade_number,
                    grade_label: letter,
                    parent_grade_id: parent.grade_level_id,
                    description: `Grade ${parent.grade_number}${letter}`,
                    createdAt: now,
                    updatedAt: now,
                });
            }
        }
        return queryInterface.bulkInsert('grade_levels', childGrades, {});
    },

    down: async (queryInterface, Sequelize) => {
        // Remove seeded records based on description
        // This assumes that the seeded rows use the description pattern "Grade X" or "Grade X<letter>"
        return queryInterface.bulkDelete('grade_levels', {
            description: {
                [Sequelize.Op.like]: 'Grade %'
            }
        }, {});
    }
};