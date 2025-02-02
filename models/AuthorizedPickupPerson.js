// models/AuthorizedPickupPerson.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuthorizedPickupPerson = sequelize.define('AuthorizedPickupPerson', {
  authorization_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  relationship_type: {
    type: DataTypes.STRING, // ENUM('Parent', 'Guardian', 'Authorized')
    allowNull: false,
  },
  authorized_by_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  authorization_status: {
    type: DataTypes.ENUM('Approved', 'Pending', 'Revoked'),
    allowNull: false,
  },
  authorization_start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  authorization_end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'authorized_pickup_persons',
  timestamps: true,
});

module.exports = AuthorizedPickupPerson;
