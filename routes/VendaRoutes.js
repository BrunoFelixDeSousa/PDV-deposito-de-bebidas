const express = require('express')
const router = express()
const VendaController = require('../controllers/VendaController')
const autorizacao = require('../helpers/autorizacao').checkAutorizacao


router.get('/venda', autorizacao, VendaController.mostrarFormularioVenda)
router.get('/venda/adicionar-produto', autorizacao, VendaController.listaCompra)
module.exports = router