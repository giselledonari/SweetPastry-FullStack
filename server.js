const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./app/database/db2.js");
require("./app/modelo/relaciones.js");


//uso de cors
app.use(cors());

//para los archivos estaticos
app.use(express.static("public"));

//configuracion templates
app.set("view engine", "ejs");

//routes
app.use(require("./app/routes/general_routes.js"));
app.use(require("./app/routes/admin_routes.js"));
app.use(require("./app/routes/compras_routes.js"));

//sequelize

async function sequelize_init(){
    try{
        await sequelize.sync({force:false})
        app.listen(3000);
        console.log("conectado puerto 3000")
    } catch (err){
        console.log(err)
    }
}

sequelize_init()