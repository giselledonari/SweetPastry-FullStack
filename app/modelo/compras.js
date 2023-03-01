const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db2");

const compras = sequelize.define("compras",{
    id: {
      type: DataTypes.STRING(40),
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = compras;
