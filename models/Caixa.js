const { DataTypes } = require('sequelize')
const Transacao = require('./Transacao')

const db = require('../config/database')

const Caixa = db.define('Caixa', {
    saldo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        default: 0
    },
})

Caixa.hasMany(Transacao);
Transacao.belongsTo(Caixa);

module.exports = Caixa