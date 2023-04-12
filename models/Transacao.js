const { DataTypes } = require('sequelize')

const db = require('../config/database')

const Transacao = db.define('Transacao', {
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM("entrada", "saida"),
        allowNull: false
    }
})

module.exports = Transacao