const { DataTypes } = require('sequelize')
const Venda = require('./Venda')

const db = require('../config/database')

const Cliente = db.define('Cliente', {
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
})

Cliente.hasMany(Venda);
Venda.belongsTo(Cliente);

module.exports = Cliente