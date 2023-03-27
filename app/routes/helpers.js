const express = require("express");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

require("dotenv").config();

//funcion para tener la informacion del token
async function perfil(token) {
  if (!token) {
    return "";
  }
  try {
    const decodedToken = await jwt.verify(token, process.env.SECRETO);
    return decodedToken;
  } catch (err) {
    console.log(err);
    return "";
  }
}

// Configurar el middleware de multer
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/assets/img"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadImage = multer({
  storage,
  limits: { fileSize: 2000000 }, //2mb
}); //campo del form

////
module.exports = { perfil, uploadImage };
