const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookie = require("cookie");

const {
  getCarrito,
  getCarritoProductos,
  agregarCarrito,
  modificarCarrito,
  vaciarCarrito,
  eliminarProductoCarrito,
  eliminarStockCero,
  generarCompra,
} = require("../controllers/compras_controller.js");
const { perfil, uploadImage } = require("./helpers.js");

//pagina carrito

//genera la pagina productos
router.get("/carrito", async (req, res) => {
  let token = req.cookies.myToken;

  if (token) {
    let perfilUser = await perfil(token);
    let usuario = await perfilUser.rut;
    try {
      let data = await getCarritoProductos(usuario);
      console.log(perfilUser);
      res.render("carrito", { data: data, dataUser: perfilUser });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("error");
  }
});

//data carrito
router.get("/api/carrito", async (req, res) => {
  let token = req.cookies.myToken;
  
  if (token) {
    let perfilUser = await perfil(token);
    let usuario = await perfilUser.rut;
    try {
      let data = await getCarrito(usuario);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({err:"error"});
  }
});

router.get("/api/carritoProductos", async (req, res) => {
  let token = req.cookies.myToken;
  if (token) {
    let perfilUser = await perfil(token);
    let usuario = await perfilUser.rut;
    try {
      let data = await getCarritoProductos(usuario);
      res.json(data);
    } catch (err) {
      res.render("error");
      console.log(err);
    }
  } else {
    res.render("error");
  }
});

router.post("/agregarCarrito", async (req, res) => {
  let cantidad = req.body.cantidad;
  let producto = req.body.producto_id;

  let token = req.cookies.myToken;
  if (token) {
    let perfilUser = await perfil(token);
    let usuario = await perfilUser.rut;

    try {
      await agregarCarrito(cantidad, producto, usuario);
      res.send("agregado al carrito");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("error");
  }
});

router.put("/modificarCarrito", async (req, res) => {
  let cantidad = req.body.cantidad;
  let producto = req.body.producto_id;

  let token = req.cookies.myToken;
  if (token) {
    let perfilUser = await perfil(token);
    let usuario = await perfilUser.rut;

    try {
      await modificarCarrito(cantidad, producto, usuario);
      res.send("carrito modificado");
      res.end();
    } catch (err) {
      console.log(err);
    }
  }
  else{
    res.render("error");
  }
});

router.delete("/vaciarCarrito", async (req, res) => {
  let token = req.cookies.myToken;
  let perfilUser = await perfil(token);
  let usuario = await perfilUser.rut;
  try {
    await vaciarCarrito(usuario);
    res.send("carrito vaciado");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/eliminarProductoCarrito", async (req, res) => {
  let producto = req.body.producto_id;

  let token = req.cookies.myToken;
  if (token){
    let perfilUser = await perfil(token);
  let usuario = await perfilUser.rut;
  try {
    await eliminarProductoCarrito(producto, usuario);
    res.send("producto eliminado del carrito");
  } catch (err) {
    console.log(err);
  }
  }else{
    res.render("error");
  }
});

router.delete("/eliminarStockCero", async (req, res) => {
  let token = req.cookies.myToken;
  let perfilUser = await perfil(token);
  let usuario = await perfilUser.rut;
  try {
    await eliminarStockCero(usuario);
    res.send("stock cero eliminado");
  } catch (err) {
    console.log(err);
  }
});

router.post("/compra", async (req, res) => {
  let token = req.cookies.myToken;
  let perfilUser = await perfil(token);
  let usuario = await perfilUser.rut;
  try {
    console.log("compra")
    await generarCompra(usuario);
    res.send("compra realizada");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
