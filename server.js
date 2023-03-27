const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const { sequelize } = require("./app/database/db2.js");
require("./app/modelo/relaciones.js");


//uso de cors
app.use(cors());
app.use(cookieParser());

//para los archivos estaticos
app.use(express.static("public"));

//configuracion templates
app.set("view engine", "ejs");

//routes
app.use(require("./app/routes/general_routes.js"));
app.use(require("./app/routes/admin_routes.js"));
app.use(require("./app/routes/compras_routes.js"));
app.use(require("./app/routes/usuarios_routes.js"));

//sequelize

async function sequelize_init(){
    try{
        await sequelize.sync({force:false})
        app.listen(process.env.PORT);
        console.log("conectado")
    } catch (err){
        console.log(err)
    }
}

sequelize_init()