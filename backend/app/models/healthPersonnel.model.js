const { Sequelize, DataTypes } = require("sequelize");

module.exports = (seq, Sequelize) => {
    const healthPersonnel = seq.define("health_personnels", {
    health_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name_health: {
        type: DataTypes.STRING,
        allowNull: false
      },
      health_center: {
        type: DataTypes.STRING
      },
      password_user: {
        type: DataTypes.STRING
      },
      tel: {
        type: DataTypes.STRING
      },
      userRole: {
        type: DataTypes.ENUM('CITIZEN', 'ADMIN', 'HEALTH'), // Utilisation de l'opérateur spread pour passer la liste comme arguments séparés
        allowNull: false
      },
});

return healthPersonnel;
};