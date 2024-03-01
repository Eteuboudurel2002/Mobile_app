const {DataTypes, Sequelize } = require('sequelize');

module.exports = (seq, Sequelize) =>{
    const citizens = seq.define("citizens",{
        citizen_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          pseudo: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          position: {
            type: DataTypes.STRING(30)
          },
          password_user: {
            type: DataTypes.STRING
          },
          tel: {
            type: DataTypes.STRING(20),
            allowNull: false
          },
          userRole: {
            type: DataTypes.ENUM('CITIZEN', 'ADMIN', 'HEALTH'), // Utilisation de l'opérateur spread pour passer la liste comme arguments séparés
            allowNull: false
          }
    });

    return citizens;
};


