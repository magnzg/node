//PROMISES -> SIMPLES.JS
/*Vamos criar um exemplo que simula buscar dados de um usuario em um banco de dados, a busca vai levar 2 sgundos*/
function buscarUsuario(id) {
    return new Promise((resolve, reject) => {
        //Iniciamos uma nova promise que pode ter dois resultados:
        //resolve, quando tem sucesso ou reject, quando da erro
        console.log(`Buscando um usuário com o ID:  ${id}`)
        setTimeout(() => { //Para simular um atraso de 2s
            const usuario = {id: id, nome: "João"}
            //Criamos um objeto representando um usuárop encontrado
            if(usuario) {
                resolve(usuario)
                //Se o usuário existir o resolve é acionado indicando que a tarefa foi concluida com sucesso
            } else {
                reject("Usuário não encontrado")
                //Se não existir o reject é acionado indicando que a tarefa falhou
            }
        }, 2000)
    })
}

buscarUsuario(1)
    .then((usuario) => { //acontece quando a promise é aprovada
        console.log("Usuário encontrado:", usuario)
    })
    .catch((erro) => { //acontece quando a promise é rejeitada
        console.log("Erro", erro)
    })