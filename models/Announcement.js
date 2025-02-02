// models/Announcement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Announcement = sequelize.define('Announcement', {
  announcement_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'announcements',
  timestamps: true,
});

module.exports = Announcement;
