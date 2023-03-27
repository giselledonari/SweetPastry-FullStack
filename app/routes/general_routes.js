const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookie = require("cookie");

const {getProductos,getProducto,} = require("../controllers/general_controller.js");
const { perfil, uploadImage } = require("./helpers.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//pages
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

//genera la data de los productos
router.get("/api/productos", async (req, res) => {
  try {
    let data = await getProductos();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

//genera la pagina productos
router.get("/productos", async (req, res) => {
  try {
    let data = await getProductos();
    res.render("productos", { data: data });
  } catch (err) {
    console.log(err);
  }
});

//genera la pagina de un producto especifico
router.get("/productoid/:id", async (req, res) => {
  let idP = req.params.id;
  let id = idP.split("p")[0];
  try {
    let dataProducto = await getProducto(id);
    res.render("producto", { data: dataProducto });
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/user", async (req, res) => {
  let token = req.cookies.myToken;
  if (token) {
    let perfilUser = await perfil(token);
    let email = await perfilUser.email;
    if (email == "admin@gmail.com") {
      res.send("admin");
    } else {
      res.send("usuario");
    }
  } else {
    res.send("usuario");
  }
});

module.exports = router;
