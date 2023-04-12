const { DataTypes, Sequelize } = require('sequelize')

const db = require('../config/database')

const Usuario = db.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    senha: {
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = Usuario