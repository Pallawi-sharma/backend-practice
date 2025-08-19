const { sequelize } = require('../db');
// const db = {};
// db.Sequelize = require('sequelize');
// db.sequelize = sequelize;

placesModel = require('./place.model')(sequelize);

module.exports = {placesModel};