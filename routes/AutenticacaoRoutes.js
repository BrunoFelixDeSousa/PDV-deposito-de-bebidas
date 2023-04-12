const express = require('express')
const router = express()
const autorizacao = require('../helpers/autorizacao').checkAutorizacao
const AutenticacaoController = require('../controllers/AutenticacaoController')

router.get('/login', AutenticacaoController.login)
router.post('/login', AutenticacaoController.loginPost)
router.get('/register', AutenticacaoController.register)
router.post('/register', AutenticacaoController.registerPost)
router.get('/logout', AutenticacaoController.logout)
router.get('/gestao', autorizacao, AutenticacaoController.painelGestao)


module.exports = router
