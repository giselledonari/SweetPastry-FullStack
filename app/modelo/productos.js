const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db2");

const productos = sequelize.define("productos",{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_producto: {
      type: DataTypes.STRING(50),
    },
    precio: {
      type: DataTypes.INTEGER,
    },
    inventario: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    imagen: {
      type: DataTypes.STRING(500),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = productos;
