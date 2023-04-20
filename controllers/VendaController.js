const Venda = require('../models/Venda')

const Produto = require('../models/produto')
const Cliente = require('../models/cliente')

let carrinho = []

// Função para adicionar um produto à lista
function adicionarProduto(produto) {
    carrinho.push(produto);
}
module.exports = class VendaController {


    
    // Função para remover um produto da lista
    static removerProduto(produto) {
        let index = produtos.indexOf(produto);
        if (index !== -1) {
        produtos.splice(index, 1);
        }
    }

    static homeVenda(req, res) {
        res.render('venda/venda')
    }

    static async mostrarFormularioVenda(req, res) {
        try {
            const produtos = await Produto.findAll({raw: true})
            // const clientes = await Cliente.findAll({raw: true})
            // console.log(produtos, clientes)
            res.render('venda/venda', { produtos })
        } catch (err) {
            console.error(err)
            res.status(500).send('Erro ao buscar produtos e clientes')
        }
    }

    static async listaCompra(req, res) {

        const { produtoId, quantidade } = req.body
        const bebida = {
            produtoId   ,
            quantidade
        }
        adicionarProduto(bebida)
  
        console.log(carrinho)
        res.redirect('/gestao/venda')
        
    }

}