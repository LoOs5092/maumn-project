// models/GradeLevel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GradeLevel = sequelize.define('GradeLevel', {
  grade_level_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grade_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'grade_levels',
  timestamps: true,
});

module.exports = GradeLevel;
