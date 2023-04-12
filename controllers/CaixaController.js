const Caixa = require('../models/Caixa')
const Produto = require('../models/Produto')

module.exports = class CaixaController {

    static homeCaixa(req, res) {
        res.render('caixa/homeCaixa')
    }

    static iniciarSaldo(req, res) {
        res.render('caixa/iniciarSaldo')
    }

    static async iniciarSaldoPost(req, res) {
        
        const saldo = req.body.saldo

        if (saldo < 0) {
            req.flash('message', '*** ❌ Operação cancelada! O saldo não pode ser menor que 0 ***')
            res.render('caixa/iniciarSaldo')
            return
        }

        try {

            const caixas = await Caixa.findAll()
            if ( caixas.length >= 1 ) {
                req.flash('message', '*** ❌ Operação cancelada! O saldo já foi cadastrado ***')
                res.render('caixa/iniciarSaldo')
                return
            }


            const saldoCriado = await Caixa.create({saldo})

            if (saldoCriado) {
                req.flash('message', '*** ✅ Saldo inciado com sucesso! ***')
                res.render('caixa/iniciarSaldo')
            }
        } catch (error) {
            console.log(error)
            req.flash('message', '*** ❌ Error ao iniciar saldo! ***')
            res.render('caixa/iniciarSaldo')
        }
    }

    static async consultarSaldo(req, res) {

        try {

            const saldoCaixa = await Caixa.findOne({ where: { id: '1' }, raw: true })

            let saldoCaixaformatado = parseFloat(saldoCaixa.saldo)


            const produtos = await Produto.findAll({ raw: true })

            let valorTotalEstoque = 0

            for( let produto of produtos ) {
                let valorFormatado = parseFloat(produto.preco)
                let quantidadeFormatado = parseFloat(produto.quantidade)

                valorTotalEstoque = valorTotalEstoque + (valorFormatado * quantidadeFormatado)

            }

            let valorTotal = valorTotalEstoque + saldoCaixaformatado

            res.render('caixa/consultarSaldo', { saldoCaixaformatado, valorTotalEstoque,  valorTotal })    
        
        } catch (error) {
            console.log(error)
        }
        
    }
}