const express = require('express')
const fetch = require('node-fetch')
const path = require('path')

const app = express();
const porta = 3000;

// Chave da API
const API_KEY = 'e484f2d1d7cb3da684f147abccfaf752';

// Servir arquivos estáticos da pasta public
app.get('/converter', async (req, res) => {
    try {
        const { valor, de, para } = req.query;

        if (!valor || !de || !para) {
            return res.status(400).json({ erro: 'Parâmetros inválidos' });
        }

        const url = `https://api.exchangerate.host/convert?from=${de}&to=${para}&amount=${valor}`;
        console.log('URL da API:', url);

        const resposta = await fetch(url);
        const dados = await resposta.json();

        console.log('Resposta da API:', dados);

        if (!dados.result && dados.result !== 0) {
            throw new Error('Resposta da API inválida');
        }

        res.json({
            valorConvertido: dados.result
        });
    } catch (erro) {
        console.error('Erro detalhado:', erro);
        res.status(500).json({ 
            erro: 'Erro ao converter moeda',
            detalhes: erro.message
        });
    }
});

// Iniciar o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
}); 