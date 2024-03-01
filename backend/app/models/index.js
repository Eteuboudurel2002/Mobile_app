const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    // Activate SSL
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.citizen = require("../models/citizen.model.js")(sequelize, Sequelize);
db.health = require("../models/healthPersonnel.model.js")(sequelize, Sequelize);
db.declaration = require("../models/declaration.model.js")(sequelize, Sequelize);


db.declaration.belongsTo(db.citizen, {
    foreignKey : "citizenId"
})


db.declaration.belongsTo(db.health, {
    foreignKey : "healthId"
})

db.health.belongsTo(db.admin, {
    foreignKey : "adminId"
})

module.exports = db;