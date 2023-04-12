const Cliente = require('../models/Cliente')

module.exports = class ClienteController {

    // GET /clientes
    static homeCliente(req, res) {
        res.render('cliente/homeCliente')
    }

    // GET /clientes/cadastrarCliente
    static cadastrarCliente(req, res) {
        res.render('cliente/cadastrarCliente')
    }

    // POST /clientes/cadastrarCliente
    static async cadastrarClientePost(req, res) {

        try {

            const { nome, telefone, email } = req.body

            if ( nome === '' || telefone === '' || email === '') {
                req.flash('message', '*** ❌ Operação cancelada! Nenhum campo pode está vazio. ***')
                res.render('cliente/homeCliente')
                return
            }

            const novoCliente = {
                nome,
                telefone,
                email
            }

            const clinteCriado = await Cliente.create(novoCliente)
            
            if (clinteCriado) {
                req.flash('message', '*** ✅ Cliente cadastrado com sucesso! ***')
                res.render('cliente/homeCliente')
            }
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao cadastrar cliente! ***')
            res.render('cliente/cadastrarCliente')

        }

    }

    static async atualizarCliente(req,res) {

        try{
            const cliente = await Cliente.findOne({ where: { id: req.params.id}, raw: true})
            res.render('cliente/atualizarCliente', { cliente })
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao Atualizar cliente! ***')
            res.render('cliente/atualizarCliente')
        }

    }

    static async atualizarClientePost(req, res) {

        const { nome, telefone, email } = req.body

        if ( nome === '' || telefone === '' || email === '') {
            req.flash('message', '*** ❌ Operação cancelada! Nenhum campo pode está vazio. ***')
            res.render('cliente/homeCliente')
            return
        }

        const clienteAtualizado = {
            nome,
            telefone,
            email
        }

        try {

            await Cliente.update(clienteAtualizado, { where: { id: req.body.id }})
            req.flash('message', '*** ✅ Cliente atualizado com sucesso! ***')
            res.render('cliente/homeCliente')
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao Atualizar cliente! ***')
            res.render('cliente/homeCliente')
        }


    }

    // GET clientes/listarClientes
    static async listarClientes(req, res) {

        try {
            const clientes = await Cliente.findAll({raw: true})

            res.render('cliente/listarClientes', {clientes})
            
        }catch (err) {
            console.log(err)
            req.flash('message', ' *** ❌ Error ao listar clientes! ***')
            res.render('gestao')
        }

    }

    static async deletarCliente(req, res) {

        const id = req.params.id

        try {
            await Cliente.destroy({where: {id: id}})
            req.flash('message', ' ✅ Cliente deletado com sucesso! ***')
            res.render('cliente/homeCliente')
        } catch (err) {
            console.log(err)
            req.flash('message', '*** ❌ Error ao deletar cliente! ***')
            res.render('cliente/homeCliente')
        }
    }
}