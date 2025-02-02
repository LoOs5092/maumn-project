const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance using the DATABASE_URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // set to console.log to see SQL queries
});

// Function to test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅  Connection to the database has been established successfully.');
  } catch (error) {
    console.error('❌  Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
