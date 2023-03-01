const productos = require("../modelo/productos.js");
const usuarios = require("../modelo/usuarios.js");
const detalle_compra = require("../modelo/detalle_compra.js");
const compras = require("../modelo/compras.js");

async function agregarProducto(id,nombre,precio,inventario,description,imagen) {
    // await User.create({ firstName: "Jane", lastName: "Doe" })
    const imagenRuta=`../assets/img/${imagen}`
    const respuesta = productos.create({
        id:id,
        nombre_producto:nombre,
        precio:precio,
        inventario:inventario,
        description:description,
        imagen:imagenRuta
    });

    return respuesta
}

async function eliminarProducto(idP) {
    const respuesta=await productos.destroy({where:{id:idP}})
    return respuesta
}

async function modificarProducto(id,nombre,precio,inventario,description,imagen) {
    // await User.update({ lastName: "Doe" }, {where: {id:x}})
    if (nombre!=""){
        await productos.update({nombre_producto:nombre},{where:{id:id}})
    }
    if (precio!=""){
        await productos.update({precio:precio},{where:{id:id}})
    }
    if (inventario!=""){
        await productos.update({inventario:inventario},{where:{id:id}})
    }
    if (description!=""){
        await productos.update({description:description},{where:{id:id}})
    }
    if (imagen!=""){
        const imagenRuta=`../assets/img/${imagen}`
        await productos.update({imagen:imagenRuta},{where:{id:id}})
    }
    
}

async function verDetalleCompras(id){
    const respuesta=await detalle_compra.findAll({
        include: [
          {
            model: compras,
          },
          {
            model: productos,
          }
        ],
    where:{compra_id:id}})
    return respuesta
}

async function verCompras(){
    const respuesta=await compras.findAll({
        include: [
          {
            model: usuarios,
          }
        ]})
    return respuesta
}
module.exports={agregarProducto,eliminarProducto,modificarProducto,verCompras,verDetalleCompras}