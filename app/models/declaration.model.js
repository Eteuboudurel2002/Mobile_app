// Importer Sequelize
const {DataTypes, Sequelize } = require('sequelize');

module.exports = (seq, Sequelize) => {
    const Declarations = seq.define("declarations", {

        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        dateCreation: {
            type: DataTypes.DATE,
            allowNull : false
          },
          position: {
            type: DataTypes.STRING(124),
            allowNull: false
          },
          response: {
            type: DataTypes.JSON,
            allowNull: false
          },
    });

    return Declarations;
};