// Carrega as configurações
require('dotenv').config();

// Verifica se as variáveis de ambiente necessárias estão definidas
if (!process.env.ID || !process.env.SECRET) {
    console.error('ERRO: As credenciais do Google não estão configuradas!');
    console.error('Verifique se o arquivo .env existe e contém ID e SECRET do Google.');
    process.exit(1);
}

// Importa as bibliotecas
const express = require('express');
const sessao = require('express-session');
const passport = require('passport');
const Google = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2/promise');

// Cria o app
const app = express();

// Configura a sessão
app.use(sessao({
    secret: process.env.CHAVE || 'chave_temporaria',
    resave: false,
    saveUninitialized: false
}));

// Configura o passport
app.use(passport.initialize());
app.use(passport.session());

// Conecta ao banco
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'login_db'
});

// Cria a tabela de usuários
async function criarTabela() {
    try {
        const conn = await db.getConnection();
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                googleId VARCHAR(255) UNIQUE,
                email VARCHAR(255),
                nome VARCHAR(255),
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        conn.release();
        console.log('Tabela de usuários verificada/criada com sucesso!');
    } catch (erro) {
        console.error('Erro ao criar tabela:', erro);
    }
}

criarTabela();

// Configura o login com Google
passport.use(new Google({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
async function(token, refresh, perfil, done) {
    try {
        const conn = await db.getConnection();
        const [rows] = await conn.execute(
            'SELECT * FROM usuarios WHERE googleId = ?',
            [perfil.id]
        );

        if (rows.length === 0) {
            await conn.execute(
                'INSERT INTO usuarios (googleId, email, nome) VALUES (?, ?, ?)',
                [perfil.id, perfil.emails[0].value, perfil.displayName]
            );
        }

        conn.release();
        return done(null, perfil);
    } catch (erro) {
        return done(erro, null);
    }
}));

// Salva o usuário na sessão
passport.serializeUser((user, done) => {
    done(null, user);
});

// Recupera o usuário da sessão
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Configura arquivos estáticos
app.use(express.static('public'));

// Rotas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Login com Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback do Google
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// Dashboard
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Dados do usuário
app.get('/api/usuario', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ erro: 'Não autenticado' });
    }
    res.json(req.user);
});

// Logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Inicia o servidor
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
    console.log('Credenciais do Google carregadas com sucesso!');
}); 