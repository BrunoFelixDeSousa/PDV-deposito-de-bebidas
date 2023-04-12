const { Sequelize } = require('sequelize')

const dbName = 'deposito_de_bebidas'
const dbUser = 'root'
const dbHost = 'localhost'
const dbPassword = 'root'

const sequelize = new Sequelize( dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql"
})

try {
    sequelize.authenticate().then(r => console.log(`Conectado ao banco de dados ${dbName}`))

} catch (err) {
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize