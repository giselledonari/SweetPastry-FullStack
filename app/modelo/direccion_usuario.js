const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db2");

const direccion_usuario = sequelize.define("direccion_usuario",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    direccion: {
      type: DataTypes.STRING(50)
    },
    comuna: {
      type: DataTypes.STRING(50)
    },
    ciudad: {
      type: DataTypes.STRING(50)
    },
    region: {
      type: DataTypes.STRING(50)
    },
  },
  {
    timestamps: false,
  }
);


module.exports = direccion_usuario;
