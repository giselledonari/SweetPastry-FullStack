const productos = require("../modelo/productos.js");

async function getProductos() {
    const respuesta=await productos.findAll()
    return respuesta
}

async function getProducto(idP) {
    const respuesta=await productos.findOne({where:{id:idP}})
    return respuesta
}

module.exports={getProductos,getProducto}