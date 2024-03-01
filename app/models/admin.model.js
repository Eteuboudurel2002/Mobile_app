// Import Sequelize
const { Sequelize, DataTypes } = require('sequelize');

const rolesList = ['CITIZEN', 'ADMIN', 'HEALTH'];

// define admin model
module.exports = (sequelize, Sequelize) => {

const Administrator = sequelize.define('administrator', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_admin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  password_user: {
    type: DataTypes.STRING
  },
  tel: {
    type: DataTypes.STRING
  },
  userRole: {
    type: DataTypes.ENUM(...rolesList), 
    allowNull: false
  }
});

return Administrator;

};