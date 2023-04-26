const Venda = require('../models/Venda')

const Produto = require('../models/produto')
const Cliente = require('../models/cliente')

const {Op} = require('sequelize')

let carrinho = []

// Função para adicionar um produto à lista
function adicionarProduto(produto) {
    carrinho.push(produto);
}
module.exports = class VendaController {

    static async mostrarFormularioVenda(req, res) {
        try {
            // const produtos = await Produto.findAll({raw: true})
            // const clientes = await Cliente.findAll({raw: true})
            // console.log(produtos, clientes)
            res.render('venda/venda')
        } catch (err) {
            console.error(err)
            res.status(500).send('Erro ao buscar produtos e clientes')
        }
    }

    static async listaCompra(req, res) {

        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        console.log("==============>" + search)

        try {
            const produto = await Produto.findAll({
                raw: true,
                where: {
                    nome: {[ Op.like ]: `%${search}%`}
                }
            })
            adicionarProduto(produto)
            console.log("==============>" + produto)
            console.log("==============>" + carrinho)
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao buscar produto! ***')
            res.render('venda')
        }        
    }

}