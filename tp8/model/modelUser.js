const Sequelize = require('../db/sequelize');
 const { DataTypes } = require('sequelize'); 

const usuarios = Sequelize.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
  },
  nom_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nac: {
    type: DataTypes.DATE
  }
},{
  timestamps: false 
});

module.exports = usuarios;
 