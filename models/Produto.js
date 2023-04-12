const { DataTypes } = require('sequelize')
const Venda = require('./Venda')

const db = require('../config/database')

const Produto = db.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    urlImagem: {
        type: DataTypes.STRING,
    },

})

Produto.belongsToMany(Venda, { through: 'VendaProduto' });
Venda.belongsToMany(Produto, { through: 'VendaProduto' });

module.exports = Produto