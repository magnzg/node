const express = require("express")
require("dotenv").config()

const app = express()
const PORT = 3000

app.use(express.static("public"))

app.get("/api/clima", async (req, res) => {
    const cidade = req.query.cidade
    if (!cidade) {
        return res.status(400).json({ erro: "Cidade não informada" })
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.API_KEY}&units=metric&lang=pt_br`
        const resposta = await fetch(url)
        const dados = await resposta.json()

        if (!resposta.ok) {
            return res.status(resposta.status).json({ erro: dados.message })
        }

        res.json(dados)
    } catch (erro) {
        res.status(500).json({ erro: "Erro interno ao buscar clima" })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
