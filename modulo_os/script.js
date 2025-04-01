//PASTA NODE -> PASTA MODULO OS -> SCRIPT.JS
//Importa o modulo os
const os = require("os")

console.log("Sistema Operacional:", os.platform())
console.log("Arquitetura:", os.arch())
console.log("Memória livre:", os.freemem(), "bytes")
console.log("Memória livre:", os.totalmem(), "bytes")