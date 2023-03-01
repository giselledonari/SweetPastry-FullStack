const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db2");

const usuarios = sequelize.define("usuarios",{
    rut: {
      type: DataTypes.STRING(4),
      primaryKey: true,
    },
    contraseña: {
      type: DataTypes.STRING(20)
    },
    nombre_cliente: {
      type: DataTypes.STRING(50)
    },
    apellido_cliente: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(50)
    },
  },
  {
    timestamps: false,
  }
);

module.exports = usuarios;
