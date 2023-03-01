const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db2");

const detalle_compra = sequelize.define("detalle_compra", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad_compra: DataTypes.INTEGER,
},{
  timestamps:false,
});

module.exports = detalle_compra;