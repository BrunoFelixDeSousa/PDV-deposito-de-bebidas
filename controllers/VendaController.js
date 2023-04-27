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

            const produtos = await Produto.findAll({ raw: true })

            res.render('venda/venda', { produtos })
        } catch (err) {
            console.error(err)
            res.status(500).send('Erro ao buscar produtos e clientes')
        }
    }

    // static async buscarProdutos(req, res) {
    //     try {
    //       const termo = req.query.search
    
    //       const produtos = await Produto.findAll({
    //         where: {
    //           nome: {
    //             [Op.like]: `%${termo}%`
    //           }
    //         },
    //         raw: true
    //       })
    
    //       res.render('venda/produtos', { produtos })
    //     } catch (err) {
    //       console.error(err)
    //       res.status(500).send('Erro ao buscar produtos')
    //     }
    //   }

      static async listaCompra(req, res) {
        try {
            const termo = req.query.search
    
                  const produtodata = await Produto.findAll({
                    where: {
                      nome: {
                        [Op.like]: `%${termo}%`
                      }
                    },
                  })

                  const produtos = produtodata.map((result) => result.get({plain: true}))
    
        //   adicionarProduto(produtos)
    console.log("==================> " + produtodata.nome)
        //   const total = carrinho.reduce((acc, produto) => {
        //     return acc + produto.preco
        //   }, 0)
    
          res.render('venda/venda', { carrinho })
        } catch (err) {
          console.error(err)
          res.status(500).send('Erro ao adicionar produto ao carrinho')
        }
      }

    // static async buscarProdutos(req, res) {
    //     try {
    //         const termoBusca = req.query.search;
    //         const produtos = await Produto.findAll({
    //             where: {
    //                 nome: {[ Op.like ]: `%${termoBusca}%`}
    //             }
    //         });
    //         res.json(produtos);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Erro ao buscar produtos');
    //     }
    // }
    

    // static async listaCompra(req, res) {
    //     const search = req.query.search

    //     console.log("==============>" + search)

    //     try {
    //         const produto = await Produto.findAll({
    //             raw: true,
    //             where: {
    //                 nome: {[ Op.like ]: `%${search}%`}
    //             }
    //         })
    //         adicionarProduto(produto)
    //         return
    //     } catch (err) {
    //         console.log(err)
    //         req.flash('message', '*** ❌ Error ao buscar produto! ***')
    //         res.render('venda')
    //     }        
    // }

}