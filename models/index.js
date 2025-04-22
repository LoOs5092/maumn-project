// models/index.js
const sequelize = require('../config/database');

const User = require('./User');
const School = require('./School');
const GradeLevel = require('./GradeLevel');
const Student = require('./Student');
const AuthorizedPickupPerson = require('./AuthorizedPickupPerson');
const DismissalRecord = require('./DismissalRecord');
const Announcement = require('./Announcement');


// School associations
School.hasMany(Student, { foreignKey: 'school_id' });
School.hasMany(Announcement, { foreignKey: 'school_id' });
School.hasMany(User, { foreignKey: 'school_id' });  // from User model defined earlier

// GradeLevel associations
GradeLevel.hasMany(Student, { foreignKey: 'grade_level_id' });
Student.belongsTo(GradeLevel, { foreignKey: 'grade_level_id' });

// Student associations
Student.belongsTo(School, { foreignKey: 'school_id' });
Student.hasMany(AuthorizedPickupPerson, { foreignKey: 'student_id' });
Student.hasMany(DismissalRecord, { foreignKey: 'student_id' });

// User associations
User.hasMany(AuthorizedPickupPerson, { foreignKey: 'user_id' });
AuthorizedPickupPerson.belongsTo(User, { foreignKey: 'user_id' });

// AuthorizedPickupPerson associations
AuthorizedPickupPerson.belongsTo(Student, { foreignKey: 'student_id' });

// DismissalRecord associations
DismissalRecord.belongsTo(Student, { foreignKey: 'student_id' });

// Announcement associations
Announcement.belongsTo(School, { foreignKey: 'school_id' });

module.exports = {
  sequelize,
  User,
  School,
  GradeLevel,
  Student,
  AuthorizedPickupPerson,
  DismissalRecord,
  Announcement,
};
