const express = require('express')                      // Importar o módulo do Express
const { create } = require('express-handlebars')        // Importar a função create do módulo Express Handlebars para criar uma instância do Handlebars
const session = require('express-session')              // Importar o módulo Express Session para lidar com sessões de usuário
const FileStore = require('session-file-store')(session)// Importar o módulo Session File Store para armazenar sessões em arquivos
const flash = require('express-flash')                  // Importar o módulo Express Flash para exibir mensagens flash para o usuário

const app = express()

const conn = require('./config/database')

// import das rotas
const CaixaRoutes = require('./routes/CaixaRoutes')
const ClienteRoutes = require('./routes/ClienteRoutes')
const ProdutoRoutes = require('./routes/ProdutoRoutes')
const TransacaoRoutes = require('./routes/TransacaoRoutes')
const VendaRoutes = require('./routes/VendaRoutes')
const autenticacaoRoutes = require('./routes/AutenticacaoRoutes')

// Configurar o Handlebars como mecanismo de visualização, especificando um diretório de partials
const handlebars = create( {partialsDir:['views/partials']})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Definir o diretório estático para arquivos públicos
app.use(express.static('public'))

// Habilitar o parsing de requisições JSON e de formulários
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Configurar session
app.use(
    session({
        name: "session", // nome do cookie
        secret: "nosso-secret", // segredo para assinar o cookie da sessão
        resave: false, // não salvar a sessão se ela não for modificada
        saveUninitialized: false, // não criar um sessão nova sem conteúdo
        store: new FileStore({ // Especificar o armazenamento das sessões em arquivos
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'session')
        }),
        cookie: {                                            // Configurar o cookie da sessão
            secure: false,                                   // Cookie seguro (HTTPS) ou não seguro (HTTP)
            maxAge: 3600000,                                 // Tempo de vida do cookie em milissegundos
            expires: new Date(Date.now() + 3600000),   // Data de expiração do cookie
            httpOnly: true                                  // Somente acessível via HTTP (não via JavaScript)
        }
    })
)

app.use(flash()) // // Configurar o middleware para exibir mensagens flash para o usuário

// Configurar o middleware para verificar se o usuário está logado e definir a variável local "session"
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// Rotas
app.use('/', autenticacaoRoutes)
app.use('/gestao', ClienteRoutes)
app.use('/gestao', ProdutoRoutes)
app.use('/gestao', CaixaRoutes)


// Rota principal
app.get('/', (req, res) => {
    res.render('home');
});




// Sincronizar o banco de dados e iniciar o servidor Express
conn.sync(/*{force:true}*/).then(() => {
    app.listen(3000)
}).catch((err) => console.log(err))

