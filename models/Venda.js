const { DataTypes } = require('sequelize')

const db = require('../config/database')

const Venda = db.define('Venda', {
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
})

module.exports = Venda