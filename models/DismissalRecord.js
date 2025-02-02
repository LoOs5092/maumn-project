// models/DismissalRecord.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DismissalRecord = sequelize.define('DismissalRecord', {
  dismissal_record_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pickup_person_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pickup_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'dismissal_records',
  timestamps: true,
});

module.exports = DismissalRecord;
