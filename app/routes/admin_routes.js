const express = require("express");
const fs = require("fs");
const router=express.Router()
const bodyParser = require("body-parser");
const { agregarProducto,eliminarProducto,modificarProducto,verCompras,verDetalleCompras}=require('../controllers/admin_controller.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//admin

router.get("/admin/agregar", (req, res) => {
    res.render("admin/agregar",{mensaje:""});
});

router.get("/admin/eliminar", (req, res) => {
    res.render("admin/eliminar",{mensaje:""});
});

router.get("/admin/modificar", (req, res) => {
    res.render("admin/modificar",{mensaje:""});
});

router.get("/admin/home", async(req, res) => {
    let data= await verCompras()
    res.render("admin/home",{data:data})
});




//agregar un producto
router.post("/agregarProducto",async (req,res)=>{
    let id=req.body.idProducto;
    let nombre=req.body.nombre;
    let precio=req.body.precio;
    let inventario=req.body.inventario;
    let description=req.body.description;
    let imagen=req.body.imagen;

    try{
        await agregarProducto(id,nombre,precio,inventario,description,imagen)
        res.render("admin/agregar",{mensaje:"Producto agregado"})
    }catch(err){
        console.log(err)
    }

    
})

//eliminar un producto
router.delete("/eliminarProducto", async(req,res)=>{
    let id=req.body.id;
    try{
        await eliminarProducto(id)
        res.render("admin/eliminar",{mensaje:"Producto eliminado "})
    }catch(err){
        console.log(err)
    }
})

//agregar un producto
router.put("/modificarProducto",async (req,res)=>{
    let id=req.body.id;
    let nombre=req.body.nombre;
    let precio=req.body.precio;
    let inventario=req.body.inventario;
    let description=req.body.description;
    let imagen=req.body.imagen;
    console.log(id,nombre,precio,inventario,description,imagen)
    try{
        await modificarProducto(id,nombre,precio,inventario,description,imagen)
        res.render("admin/modificar",{mensaje:"Producto modificado"})
    }catch(err){
        console.log(err)
    }

    
})

router.get('api/ventas/:id',async (req,res)=>{
    let id=req.params.id;
    let respuesta= await verDetalleCompras(id)
    res.send(respuesta)
})

module.exports = router