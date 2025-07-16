const { Sequelize } = require('sequelize');
const config = require('./config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Exit if DB fails
  }
}

module.exports = {
  sequelize,
  connectDB,
};