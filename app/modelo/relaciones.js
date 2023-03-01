const usuarios = require("./usuarios.js");
const direccion_usuario = require("./direccion_usuario.js");
const productos = require("./productos.js");
const carrito = require("./carrito.js");
const compras = require("./compras.js");
const detalle_compra = require("./detalle_compra.js");

//tablarelacionada.relacion(tabla,foreingkey,..)
//tabla.relacion(tablarelacionada,foreinkey...)

//direccion
usuarios.hasOne(direccion_usuario, { foreignKey: "usuario_rut" });
direccion_usuario.belongsTo(usuarios, { foreignKey: "usuario_rut" });

//carrito
productos.hasMany(carrito, { foreignKey: "producto_id" });
carrito.belongsTo(productos, { foreignKey: "producto_id" });

usuarios.hasOne(carrito, { foreignKey: "usuario_rut" });
carrito.belongsTo(usuarios, { foreignKey: "usuario_rut" });

//compra

usuarios.hasMany(compras, { foreignKey: "usuario_rut" });
compras.belongsTo(usuarios, { foreignKey: "usuario_rut" });

//detalle_compra
productos.hasMany(detalle_compra, { foreignKey: "producto_id" });
detalle_compra.belongsTo(productos, { foreignKey: "producto_id" });

compras.hasMany(detalle_compra, { foreignKey: "compra_id" });
detalle_compra.belongsTo(compras, { foreignKey: "compra_id" });
