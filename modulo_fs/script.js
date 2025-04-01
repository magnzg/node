//NODE -> MODULO FS -> SCRIPT.JS
const fs = require("fs") //cria o arquivo
//fs = variavel

// fs.writeFileSync("mensagem.txt", "Oi, criei esse arquivo pelo node")
// //fs.escreverArquivoSincronizado

// console.log("Arquivo criado com sucesso!")

const conteudo = fs.readFileSync("mensagem.txt", "utf-8") //ler arquivo
console.log("conteúdo do arquivo:")
console.log(conteudo)