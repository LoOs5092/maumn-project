'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let tableInfo;
        try {
            // Retrieve the table definition
            tableInfo = await queryInterface.describeTable('grade_levels');
        } catch (error) {
            // If table doesn't exist, create it with the final structure
            return queryInterface.createTable('grade_levels', {
                grade_level_id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                grade_number: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                grade_label: {
                    type: Sequelize.STRING(10),
                    allowNull: true,
                },
                parent_grade_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'grade_levels',
                        key: 'grade_level_id'
                    }
                },
                description: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            });
        }

        // 1. Add grade_number column (integer, not null) if it doesn't exist
        if (!tableInfo.grade_number) {
            await queryInterface.addColumn('grade_levels', 'grade_number', {
                type: Sequelize.INTEGER,
                allowNull: false,
            });
        }

        // 2. Add grade_label column (string up to 10 characters, allow null for parent grades) if it doesn't exist
        if (!tableInfo.grade_label) {
            await queryInterface.addColumn('grade_levels', 'grade_label', {
                type: Sequelize.STRING(10),
                allowNull: true,
            });
        }

        // 3. Split existing grade_name values into grade_number and grade_label.
        // Only run if grade_name exists
        if (tableInfo.grade_name) {
            await queryInterface.sequelize.query(`
                UPDATE grade_levels
                SET grade_number = CAST(SUBSTRING(grade_name FROM 1 FOR 1) AS INTEGER),
                    grade_label = CASE 
                                   WHEN CHAR_LENGTH(grade_name) > 1 THEN SUBSTRING(grade_name FROM 2)
                                   ELSE NULL
                                  END
            `);
        }

        // 4. Remove the old grade_name column if it exists
        if (tableInfo.grade_name) {
            await queryInterface.removeColumn('grade_levels', 'grade_name');
        }

        // Refresh table info after modifying columns
        const updatedTableInfo = await queryInterface.describeTable('grade_levels');
        
        // 5. Add parent_grade_id column for self-reference (for child grades) if it doesn't exist
        if (!updatedTableInfo.parent_grade_id) {
            await queryInterface.addColumn('grade_levels', 'parent_grade_id', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'grade_levels',
                    key: 'grade_level_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        // Retrieve table info
        const tableInfo = await queryInterface.describeTable('grade_levels');

        // 1. Re-add grade_name column if it doesn't exist
        if (!tableInfo.grade_name) {
            await queryInterface.addColumn('grade_levels', 'grade_name', {
                type: Sequelize.STRING(20),
                allowNull: false,
            });
        }

        // 2. Combine grade_number and grade_label back into grade_name.
        await queryInterface.sequelize.query(`
            UPDATE grade_levels
            SET grade_name = CONCAT(grade_number, COALESCE(grade_label, ''))
        `);

        // 3. Remove the columns added in up(), if they exist
        if (tableInfo.grade_number) {
            await queryInterface.removeColumn('grade_levels', 'grade_number');
        }
        if (tableInfo.grade_label) {
            await queryInterface.removeColumn('grade_levels', 'grade_label');
        }
        if (tableInfo.parent_grade_id) {
            await queryInterface.removeColumn('grade_levels', 'parent_grade_id');
        }
    }
};