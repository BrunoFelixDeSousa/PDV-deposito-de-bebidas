const Produto = require('../models/Produto')

module.exports = class ProdutoController {

    static homeProdutos(req, res) {
        res.render('produto/homeProdutos')
    }

    static cadastrarProduto(req, res) {
        res.render('produto/cadastrarProduto')
    }

    static async cadastrarProdutoPost(req, res) {
        
        try {
            const { nome, descricao, preco, quantidade, urlImagem } = req.body

            if( nome === '' || descricao === '' || preco === '' || quantidade === '') {
                req.flash('message', '*** ❌ Operação cancelada! Nenhum campo pode está vazio. ***')
                res.render('produto/homeProdutos')
                return
            }

            const novoProduto = {
                nome,
                descricao,
                preco,
                quantidade,
                urlImagem
            }
            
            const produtoCriado = await Produto.create(novoProduto)
            if (produtoCriado) {
                req.flash('message', '*** ✅ Produto cadastrado com sucesso! ***')
                res.render('produto/homeProdutos')
            }
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao cadastrar Produto! ***')
            res.render('produto/homeProdutos')
        }
    }

    static async listarProdutos(req, res) {

        try {
            
            const produtos = await Produto.findAll({ raw: true })

            let valorTotal = 0
            for( let produto of produtos ) {
                let valorFormatado = parseFloat(produto.preco)
                let quantidadeFormatado = parseFloat(produto.quantidade)

                valorTotal = valorTotal + (valorFormatado * quantidadeFormatado)

            }

            res.render('produto/listarProdutos', { produtos, valorTotal })

        } catch (error) {
            console.error(error)
            req.flash('message', '*** ❌ Error ao listar Produtos! ***')
            res.render('produto/homeProdutos')
        }
    }

    static async atualizarProduto(req, res) {
        
        try {
            const produto = await Produto.findOne({ where : { id: req.params.id }, raw: true })
            res.render('produto/atualizarProduto', { produto })
        } catch (error) {
            console.error(error);
            req.flash('message', '*** ❌ Error ao atualizar produto! ***')
            res.render('produto/atualizarProduto')
        }
    }

    static async atualizarProdutoPost(req, res) {

        try {

            const { nome, descricao, preco, quantidade, urlImagem } = req.body

            if ( nome === '' || descricao === '' || preco === '' || quantidade === '' ) {
                
                req.flash('message', '*** ❌ Operação cancelada! Nenhum campo pode está vazio. ***')
                res.render('produto/homeProdutos')
                return
            }
            
            const produtoAtualizado = {
                nome,
                descricao,
                preco,
                quantidade,
                urlImagem
            }

            await Produto.update(produtoAtualizado, { where: { id: req.body.id }})
            req.flash('message', '*** ✅ Produto atualizado com sucesso! ***')
            res.render('produto/homeProdutos')
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao Atualizar Produto! ***')
            res.render('produto/homeProdutos')
        }
    }

    static async deletarProduto(req, res) {
        const id = req.params.id

        try {
            await Produto.destroy({ where: { id: id }})
            req.flash('message', '*** ✅ Produto deletado com sucesso! ***')
            res.render('produto/homeProdutos')
        } catch (error) {
            console.log(error)
            req.flash('message', '*** ❌ Error ao deletar produto! ***')
            res.render('produto/homeProdutos')
        }
    }

    static async valorEstoque(req, res) {

    }

}