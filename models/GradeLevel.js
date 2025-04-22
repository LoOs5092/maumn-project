// models/GradeLevel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GradeLevel = sequelize.define('GradeLevel', {
  grade_level_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grade_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grade_label: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  parent_grade_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'grade_levels',
  timestamps: true,
});

// Optional self-referential association setup
GradeLevel.associate = models => {
  GradeLevel.hasMany(models.GradeLevel, {
    as: 'subGrades',
    foreignKey: 'parent_grade_id'
  });
  GradeLevel.belongsTo(models.GradeLevel, {
    as: 'parentGrade',
    foreignKey: 'parent_grade_id'
  });
};

module.exports = GradeLevel;
