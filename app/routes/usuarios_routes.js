const express = require("express");
const router=express.Router()
const bodyParser = require("body-parser");
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
require("dotenv").config();

const {buscarEmail,buscarRut,agregarUsuario}=require('../controllers/usuarios_controller.js')
const {perfil,uploadImage}=require("./helpers.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


//pages
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/registro", (req, res) => {
    res.render("registro");
});


//registro
router.post("/form/registro", async(req, res) => {
    const {rut,nombre,apellido,email,contrasena}=req.body
    const contrasena_encript = await bcrypt.hash(contrasena, 8); //para encriptar
    try{
        let prueba1=await buscarEmail(email)
        let prueba2=await buscarRut(rut)
        console.log(prueba2)
        if (prueba1){
            
            res.send({err:"Email ya existe"})
        }
        else if (prueba2){
            res.send({err:"Rut ya existe"})
        }
        else{
            await agregarUsuario(rut,contrasena_encript,nombre,apellido,email)
            res.send({mensaje:"Agregado"})
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
});

//login

router.post("/form/login", async(req, res) => {
    const {email,contrasena}=req.body

   try{
        let prueba1=await buscarEmail(email)

        if (prueba1.length==0){
            res.send({mensaje:"Email no existe"});
        }
        else{  
        let contrasenaCheck=await bcrypt.compare(contrasena,prueba1.dataValues.contraseña)
        if(contrasenaCheck){
            const token=jwt.sign({
            exp:Math.floor(Date.now()/1000)+60*60*1,//*1 hora
            email:email,
            rut:prueba1.dataValues.rut,
            nombre:prueba1.dataValues.nombre_cliente,
            apellido:prueba1.dataValues.apellido_cliente
            },process.env.SECRETO)

            res.cookie('myToken', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 1000*60*60*1
            });

            if(email=="admin@gmail.com"){
                res.send({mensaje:"admin"})
            }
            else{
                res.send({mensaje:"usuario"})
            }
        }
        else{
            res.send({err:"Contraseña incorrecta"});
        }

        }
    }
    catch(err){
        res.send({err:`Error:${err}`});
    }
    
});

module.exports = router