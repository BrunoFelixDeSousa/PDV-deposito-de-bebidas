    const express = require('express')
    const router = express()
    const ClienteController = require('../controllers/ClienteController')
    const autorizacao = require('../helpers/autorizacao').checkAutorizacao

    router.get('/clientes', autorizacao, ClienteController.homeCliente)
    router.get('/clientes/cadastrarCliente', autorizacao, ClienteController.cadastrarCliente)
    router.post('/clientes/cadastrarCliente', autorizacao, ClienteController.cadastrarClientePost)
    router.get('/clientes/atualizarCliente/:id', autorizacao, ClienteController.atualizarCliente)
    router.post('/clientes/atualizarCliente', autorizacao, ClienteController.atualizarClientePost)
    router.get('/clientes/listarClientes', autorizacao, ClienteController.listarClientes)
    router.get('/clientes/deletarCliente/:id', autorizacao, ClienteController.deletarCliente)


    module.exports = router