const express = require('express')
const CaixaController = require('../controllers/CaixaController')
const autorizacao = require('../helpers/autorizacao').checkAutorizacao

const router = express()

router.get('/caixa', autorizacao, CaixaController.homeCaixa)
router.get('/caixa/iniciarSaldo', autorizacao, CaixaController.iniciarSaldo)
router.post('/caixa/iniciarSaldo', autorizacao, CaixaController.iniciarSaldoPost)
router.get('/caixa/consultarSaldo', autorizacao, CaixaController.consultarSaldo)

module.exports = router;