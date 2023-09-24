const Sequelize = require("sequelize");
const sequelize = new Sequelize("ecommerce_tp8", "root", "Capitan2019#", {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
.then(()=>{
    console.log("CONEXION EXITOSA")
})
.catch((error)=>{
    console.log("ERROR " + error)
})


module.exports = sequelize;