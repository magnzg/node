//SINCRONO E ASSINCRONO -> ASSINCRONO.JS
function tarefaDemorada(nome, tempo) {
    setTimeout(() => {
        console.log(`Tarefa ${nome} concluida`)
    }, tempo)
}

console.log("iniciado o programa")
console.log("Executando a tarefa 1")
tarefaDemorada(1, 3000) //Tarefa 1 vai demorar 3 segundos, mas não vai travar o codigo

console.log("Executando a tarefa 2")
tarefaDemorada(2, 3000) //Tarefa 2 tambem vai demorar 3 segundos e vai iniciar logo depois da primeira

console.log("Programa Finalizado (mas as tarefas ainda estão acontecendo")