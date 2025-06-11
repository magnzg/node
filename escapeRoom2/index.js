const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let resolvidos = {
    grampeador: false,
    papeis: false,
    almofada: false,
    livro: false,
    janela: false,
    armario: false
}

function menuPrincipal() {
    console.log("\n🔒 Você está preso em uma sala misteriosa.")
    console.log("👀 Olhando ao redor, você vê:")
    console.log("1. 📎 Um grampeador velho")
    console.log("2. 📄 Papéis amassados sobre a mesa")
    console.log("3. 🛋️ Uma almofada fora do lugar")
    console.log("4. 📚 Um livro empoeirado no chão")
    console.log("5. 🪟 Uma janela embaçada")
    console.log("6. 🚪 Um armário trancado")
    console.log("7. 🚷 Tentar abrir a porta")

    rl.question("\n🤔 O que você deseja investigar? ", (resposta) => {
        switch (resposta.trim()) {
            case "1":
                investigarGrampeador()
                break
            case "2":
                investigarPapeis()
                break
            case "3":
                investigarAlmofada()
                break
            case "4":
                investigarLivro()
                break
            case "5":
                investigarJanela()
                break
            case "6":
                investigarArmario()
                break
            case "7":
                verificarSaida()
                break
            default:
                console.log("❌ Opção inválida. Tente novamente.")
                menuPrincipal()
        }
    })
}

function investigarGrampeador() {
    if (resolvidos.grampeador) {
        console.log("📎 Você já resolveu esse enigma.")
        return menuPrincipal()
    }
    rl.question("\n🧩 No grampeador há um bilhete: 'Sou cheio de buracos, mas seguro a água. O que sou?' ", (resposta) => {
        if (resposta.trim().toLowerCase() == "esponja") {
            console.log("✅ Acertou! Você encontrou uma chave escondida dentro do grampeador.")
            resolvidos.grampeador = true
        } else {
            console.log("❌ Resposta errada. Tente novamente depois.")
        }
        menuPrincipal()
    })
}

function investigarPapeis() {
    if (resolvidos.papeis) {
        console.log("📄 Você já resolveu esse enigma.")
        return menuPrincipal()
    }
    rl.question("\n🧩 Um dos papéis diz: 'Qual palavra está sempre escrita errada no dicionário?' ", (resposta) => {
        if (resposta.trim().toLowerCase() == "errada") {
            console.log("✅ Acertou! Uma chave estava presa entre os papéis.")
            resolvidos.papeis = true
        } else {
            console.log("❌ Errou! Tente outra vez.")
        }
        menuPrincipal()
    })
}

function investigarAlmofada() {
    if (resolvidos.almofada) {
        console.log("🛋️ Você já resolveu esse enigma.")
        return menuPrincipal()
    }
    rl.question("\n🧩 Costurada na almofada, uma mensagem: 'Quanto mais você tira de mim, maior eu fico. O que sou?'", (resposta) => {
        if (resposta.trim().toLowerCase() == "buraco") {
            console.log("✅ Correto! Dentro da almofada havia uma pequena chave.")
            resolvidos.almofada = true
        } else {
            console.log("❌ Não é isso. Pense melhor!")
        }
        menuPrincipal()
    })
}

function investigarLivro() {
    if (resolvidos.livro) {
        console.log("📚 Você já resolveu esse enigma.")
        return menuPrincipal()
    }
    rl.question("\n🧩 Dentro do livro há uma charada: 'Tenho páginas mas não sou lido. Levo pessoas, mas não tenho rodas. O que sou?'", (resposta) => {
        if (resposta.trim().toLowerCase().includes("elevador")) {
            console.log("✅ Acertou! Uma chave estava entre as páginas do livro.")
            resolvidos.livro = true
        } else {
            console.log("❌ Resposta incorreta.")
        }
        menuPrincipal()
    })
}

function investigarJanela() {
    if (resolvidos.janela) {
        console.log("🪟 Você já resolveu esse enigma.")
        return menuPrincipal()
    }
    rl.question("\n🧩 Na janela embaçada está escrito com o dedo: 'Quanto mais se tira, mais claro fica. O que é?'", (resposta) => {
        if (
            resposta.trim().toLowerCase().includes("neblina") ||
            resposta.trim().toLowerCase().includes("embaçado") ||
            resposta.trim().toLowerCase().includes("sujeira")
        ) {
            console.log("✅ Isso mesmo! Atrás da cortina da janela, há uma chave.")
            resolvidos.janela = true
        } else {
            console.log("❌ Errou! Reflita mais.")
        }
        menuPrincipal()
    })
}

function investigarArmario() {
    if (resolvidos.armario) {
        console.log("🚪 Você já resolveu esse enigma.")
        return menuPrincipal()
    }
    rl.question("\n🧩 No armário há um cofre com senha: 'Se você me tem, quer compartilhar. Se me compartilha, não me tem. O que sou?'", (resposta) => {
        if (resposta.trim().toLowerCase() == "segredo") {
            console.log("✅ Correto! Uma das últimas chaves estava escondida no armário.")
            resolvidos.armario = true
        } else {
            console.log("❌ Errado! Essa é difícil mesmo.")
        }
        menuPrincipal()
    })
}

function verificarSaida() {
    if (
        resolvidos.grampeador &&
        resolvidos.papeis &&
        resolvidos.almofada &&
        resolvidos.livro &&
        resolvidos.janela &&
        resolvidos.armario
    ) {
        console.log("\n🔓 Você reuniu todas as 6 chaves escondidas na sala!")
        console.log("Parabéns!🎉 A porta se destranca lentamente com um clique...")
        console.log("Você ESCAPOU!🎉")
        rl.close()
    } else {
        console.log("\n🚪 A porta ainda está trancada.")
        console.log("🧠 Continue investigando. Faltam enigmas a serem resolvidos.")
        menuPrincipal()
    }
}

console.log("🧩🔐 Bem-vindo ao ESCAPE ROOM - Desafie sua mente!")
menuPrincipal()
