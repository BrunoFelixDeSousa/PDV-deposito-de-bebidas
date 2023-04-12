const express = require('express')
const router = express()
const ProdutoController = require('../controllers/ProdutoController')
const autorizacao = require('../helpers/autorizacao').checkAutorizacao

router.get('/produtos', autorizacao, ProdutoController.homeProdutos)
router.get('/produtos/cadastrarProduto', autorizacao, ProdutoController.cadastrarProduto)
router.post('/produtos/cadastrarProduto', autorizacao, ProdutoController.cadastrarProdutoPost)
router.get('/produtos/listarProdutos', autorizacao, ProdutoController.listarProdutos)
router.get('/produtos/atualizarProduto/:id', autorizacao, ProdutoController.atualizarProduto)
router.post('/produtos/atualizarProduto', autorizacao, ProdutoController.atualizarProdutoPost)
router.get('/produtos/deletarProduto/:id', autorizacao, ProdutoController.deletarProduto)

module.exports = router