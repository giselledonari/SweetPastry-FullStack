const usuarios = require("../modelo/usuarios.js");

async function buscarEmail(email) {
    const respuesta=await usuarios.findOne({where:{email:email}})
    return respuesta
}

async function buscarRut(rut) {
    const respuesta=await usuarios.findOne({where:{rut:rut}})
    return respuesta
}

async function agregarUsuario(rut,contrasena,nombre,apellido,email) {
    const respuesta = usuarios.create({
        rut:rut,
        contraseña:contrasena,
        nombre_cliente:nombre,
        apellido_cliente:apellido,
        email:email
    });
  
    return respuesta;
}
module.exports={buscarEmail,buscarRut,agregarUsuario}