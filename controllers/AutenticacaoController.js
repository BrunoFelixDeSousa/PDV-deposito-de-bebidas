const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

module.exports = class AutenticacaoController {

    // GET /login
    static login(req, res) {
        res.render('autenticacao/login')
    }

    // POST /login
    static async loginPost(req, res) {

        const { email, senha } = req.body
        const usuario = await Usuario.findOne( { where: { email: email }} )

        if (!usuario) {
            req.flash('message', 'Usuario não encontrado!')
            res.render('autenticacao/login')
            return
        }

        const senhaMatch = bcrypt.compareSync(senha, usuario.senha)

        if (!senhaMatch) {
            req.flash('message', 'Senha incorreto!')
            res.render('autenticacao/login')
            return
        }

        req.session.userid = usuario.id

        req.flash('message', 'Usuario logado com sucesso!')

        req.session.save(() => {
            res.redirect('/gestao')
        })
    }

    // GET /gestao
    static painelGestao(req, res) {
        res.render('gestao')
    }

    // GET /register
    static register(req, res) {
        res.render('autenticacao/register')
    }

    // POST /register
    static async registerPost(req, res) {

        const { nome, email, senha, confirmarsenha } = req.body

        if (senha !== confirmarsenha) {
            req.flash('message', 'As senhas não confere, tente novamente!')
            res.render('autenticacao/register')
            return
        }

        const checaSeUsuarioExiste = await Usuario.findOne({ where: {email: email} } )

        if (checaSeUsuarioExiste) {
            res.flash('message', 'Email já está em uso!')
            res.render('autenticacao/register')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedSenha = bcrypt.hashSync(senha, salt)

        const usuario = {
            nome,
            email,
            senha: hashedSenha
        }

        try {
            const usuarioCriado = await Usuario.create(usuario)
            req.session.userid = usuarioCriado.id
            req.flash('message', 'Usuário criado com sucesso!')
            req.session.save(() => {
                res.redirect('/gestao')
            })
        } catch (err) {
            console.log(err)
        }
    }

    // GET /logout
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }


}