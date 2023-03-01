const carrito = require("../modelo/carrito.js");
const productos = require("../modelo/productos.js");
const usuarios = require("../modelo/usuarios.js");
const detalle_compra = require("../modelo/detalle_compra.js");
const compras = require("../modelo/compras.js");
const { v4: uuidv4 } = require('uuid')

const { sequelize } = require("../database/db2.js");
const { getProductos,getProducto}=require('./general_controller.js')

async function getCarrito() {
  const respuesta = await carrito.findAll({ where: { usuario_rut: "00-0" } });
  return respuesta;
}

async function agregarCarrito(cantidad, producto, usuario) {
  const respuesta = carrito.create({
    cantidad: cantidad,
    producto_id: producto,
    usuario_rut: usuario,
  });

  return respuesta;
}

async function modificarCarrito(cantidad, producto, usuario) {
  const respuesta = await carrito.update(
    { cantidad: cantidad },
    { where: { producto_id: producto, usuario_rut: usuario } }
  );
  return respuesta;
}

async function vaciarCarrito(usuario) {
  const respuesta = await carrito.destroy({ where: { usuario_rut: usuario } });
  return respuesta;
}

async function getCarritoProductos(usuario="00-0") {
  const respuesta = await carrito.findAll({
    include: [
      {
        model: productos,
      },
      {
        model: usuarios,
      },
    ],
    where: { usuario_rut: usuario },
    order: [["id", "ASC"]],
  });
  return respuesta;
}

async function eliminarProductoCarrito(producto, usuario) {
  const respuesta = await carrito.destroy({
    where: { producto_id: producto, usuario_rut: usuario },
  });
  return respuesta;
}

async function eliminarStockCero() {
  const respuesta = await carrito.destroy({ where: { cantidad: 0 } });
  return respuesta;
}

//compra
async function generarCompra(usuario) {
    console.log(usuario)
    const t=await sequelize.transaction()
    const dataCarritoAux = await getCarritoProductos(usuario);
    const dataCarrito = dataCarritoAux.map((item) => item.dataValues);

    const id_compra=uuidv4()

    try{
        await compras.create({
            id:id_compra,
            usuario_rut:usuario,
            fecha: new Date()
          });
        
        for (let value of dataCarrito){
            let id=value.id
            let cantidad=value.cantidad
            let inventarioAux=await getProducto(id)
            let inv=inventarioAux.dataValues.inventario
            console.log(inv)
            
            let new_inventario=parseInt(inv)-parseInt(cantidad)

            await detalle_compra.create({
                producto_id:id,
                cantidad_compra:cantidad,
                compra_id:id_compra
            })

            await productos.update(
                {inventario:new_inventario},
                {where:{id:id}})
        }
        await vaciarCarrito(usuario)

        await t.commit()

    }catch(err){
        await t.rollback()
        throw err
    }

}

module.exports = {
  getCarrito,
  agregarCarrito,
  modificarCarrito,
  vaciarCarrito,
  getCarritoProductos,
  eliminarProductoCarrito,
  eliminarStockCero,
  generarCompra,
};
