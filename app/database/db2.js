const { Sequelize } = require('sequelize');

const sequelize=new Sequelize('sweetpastry','postgres','pg999', {
    host:'localhost',
    dialect:'postgres'
})

module.exports= {sequelize}


