const  Sequelize= require('../db/sequelize'); 
const DataTypes =require('sequelize');
const producto = Sequelize.define('productos', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_producto: {
        type: DataTypes.STRING,
    },
    descripcion_producto: {
        type: DataTypes.STRING,
    },
    precio_producto: {
        type: DataTypes.DECIMAL
    }
}, {
    timestamps: false 
});
module.exports = producto;
 