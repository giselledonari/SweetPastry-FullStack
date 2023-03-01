const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db2");


const carrito = sequelize.define('carrito', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
  });

module.exports=carrito