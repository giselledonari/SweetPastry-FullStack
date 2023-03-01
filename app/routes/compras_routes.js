const express = require("express");
const router=express.Router()
const bodyParser = require("body-parser");
const { getCarrito,getCarritoProductos,agregarCarrito,modificarCarrito,vaciarCarrito,eliminarProductoCarrito,eliminarStockCero,generarCompra}=require('../controllers/compras_controller.js')

//pagina carrito

//genera la pagina productos
router.get("/carrito", async(req, res) => {
    try{
        let data= await getCarritoProductos()
        res.render("carrito",{data:data})
    }catch(err){
        console.log(err)
    }
});

//data carrito
router.get("/api/carrito", async(req, res) => {
    try{
        let data= await getCarrito()
        res.json(data)
    }catch(err){
        console.log(err)
    }
});

router.get("/api/carritoProductos", async(req, res) => {
    try{
        let data= await getCarritoProductos()
        res.json(data)
    }catch(err){
        console.log(err)
    }
});

router.post("/agregarCarrito", async(req, res) => {
    let cantidad=req.body.cantidad;
    let producto=req.body.producto_id;
    let usuario=req.body.usuario_rut;
    console.log(producto,usuario)
    try{
        await agregarCarrito(cantidad,producto,usuario)
        res.send("agregado al carrito")
    }catch(err){
        console.log(err)
    }
});

router.put("/modificarCarrito", async(req, res) => {
    let cantidad=req.body.cantidad;
    let producto=req.body.producto_id;
    let usuario=req.body.usuario_rut;
    try{
        await modificarCarrito(cantidad,producto,usuario)
        res.send("carrito modificado")
    }catch(err){
        console.log(err)
    }
});

router.delete("/vaciarCarrito", async(req, res) => {
    let usuario=req.body.usuario_rut;
    try{
        await vaciarCarrito(usuario)
        res.send("carrito vaciado")
    }catch(err){
        console.log(err)
    }
});

router.delete("/eliminarProductoCarrito", async(req, res) => {
    let producto=req.body.producto_id;
    let usuario=req.body.usuario_rut;
    try{
        await eliminarProductoCarrito(producto,usuario)
        res.send("producto eliminado del carrito")
    }catch(err){
        console.log(err)
    }
});

router.delete("/eliminarStockCero", async(req, res) => {
    try{
        await eliminarStockCero()
        res.send("stock cero eliminado")
    }catch(err){
        console.log(err)
    }
});

router.post("/compra", async(req, res) => {
    let usuario=req.body.usuario_rut;
    try{
        await generarCompra(usuario)
        res.send("compra realizada")
    }catch(err){
        console.log(err)
    }
});

module.exports = router