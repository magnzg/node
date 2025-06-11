const readline = require("readline")
const rl = readline. createInterface({
    input: process.stdin, //0 que o usuário digita = entrada
    output: process.stdout //0 que aparece para ele = saída
})
let resolvidos = {
    grampeador: false,
    papeis: false,
    almofada: false
}

function menuPrincipal() {
    console.log("\nVocê está em uma sala trancada")
    console.log("Ao seu redor, você vê:")
    console.log("1. Um grampeador velho")
    console.log("2. Um monte de papéis amassados na mesa")
    console.log("3. Uma almofada fora do lugar")
    console.log("4. Tentar abrir a porta")

    rl.question("\nO que você deseja fazer?", (resposta) => {
        switch (resposta.trim()){ //compara se é igual, resposta = 1 
            case "1": //if
                investigarGrampeador()
                break
            case "2": //if else
                investigarPapeis()
                break
            case "3":
                investigarAlmofada()
                break
            case "4":
                verificarSaida()
                break
            default: //else
                console.log("Escolha inválida")
                menuPrincipal()
        }
    })
}
function investigarGrampeador(){
    if(resolvidos.grampeador){
        console.log("Você já resolveu esse desafio")
        return menuPrincipal()
    }
    rl.question("\n Dentro do grampeador tem um bilhete: 'Sou cheio de buracos, mas seguro a água. O que sou?'", (resposta) => {
        if(resposta.trim().toLowerCase() == "esponja") {
            console.log("Acertou! Você desbloqueou a chave que estava no grampeador")
            resolvidos.grampeador = true
        } else {
            console.log("Resposta Errada. Tente novamente depois")
        }
        menuPrincipal()
    })
}
function investigarPapeis(){
    if(resolvidos.papeis) {
        console.log("Você já resolveu esse desafio")
        return menuPrincipal()
    }
    rl.question("\nUm dos papéis diz: 'Qual palavra está sempre escrita errada no dicionário?'" , (resposta) => {
        if(resposta. trim().toLowerCase() == "errada") {
            console.log("Acertou! Você encontrou a chave no meio dos papéis")
            resolvidos.papeis = true
        } else {
            console. log("Errou! Não é isso")
        }
        menuPrincipal()
    })
}
function investigarAlmofada() {
    if(resolvidos.almofada) {
        console. log("Você já resolveu esse desafio")
        return menuPrincipal()
    }
    rl.question("\nNa almofada, tem um enigma: 'Estou no começo, no meio, mas nunca no fim. Quem sou?'", (resposta) => {
        if(resposta. trim().toLowerCase().includes("letra e")) {
            console.log("Voce acertou! A chave estava dentro da almofada")
            resolvidos. almofada = true
        } else {
            console.log("Não é isso, Pense um pouco mais")
        }
        menuPrincipal()
    })
}
function verificarSaida() {
    if(resolvidos.grampeador && resolvidos.almofada && resolvidos.papeis) {
        console.log("Voce encontrou as 3 chaves")
        console. log("Parabens, voce escapou")
        rl.close
    } else {
        console. log("A porta ainda esta fechada. Voce nao resolveu os enigmas")
        menuPrincipal()
    }
}
console. log("Bem vindo ao Escape Room")
menuPrincipal()
