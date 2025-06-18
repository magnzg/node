const enigmas = {
  grampeador: {
    pergunta: "No grampeador há um bilhete: 'Sou cheio de buracos, mas seguro a água. O que sou?'",
    resposta: ["esponja"],
    imagem: "img/grampeador.png",
    resolvido: false
  },
  papeis: {
    pergunta: "Um dos papéis diz: 'Qual palavra está sempre escrita errada no dicionário?'",
    resposta: ["errada"],
    imagem: "img/papeis.png",
    resolvido: false
  },
  almofada: {
    pergunta: "Costurada na almofada, uma mensagem: 'Quanto mais você tira de mim, maior eu fico. O que sou?'",
    resposta: ["buraco"],
    imagem: "img/almofada.png",
    resolvido: false
  },
  livro: {
    pergunta: "Dentro do livro há uma charada: 'Tenho páginas mas não sou lido. Levo pessoas, mas não tenho rodas. O que sou?'",
    resposta: ["elevador"],
    imagem: "img/livro.png",
    resolvido: false
  },
  janela: {
    pergunta: "Na janela embaçada está escrito: 'Quanto mais se tira, mais claro fica. O que é?'",
    resposta: ["neblina", "embaçado", "sujeira"],
    imagem: "img/janela.png",
    resolvido: false
  },
  armario: {
    pergunta: "No armário há um cofre com senha: 'Se você me tem, quer compartilhar. Se me compartilha, não me tem. O que sou?'",
    resposta: ["segredo"],
    imagem: "img/cofre.png",
    resolvido: false
  }
}

let itemAtual = ""
const descricao = document.getElementById("descricao")
const respostaInput = document.getElementById("resposta")
const feedback = document.getElementById("feedback")
const imagem = document.getElementById("imagem-enigma")

const somAcerto = document.getElementById("som-acerto")
const somErro = document.getElementById("som-erro")
const somVitoria = document.getElementById("som-vitoria")

function iniciarJogo() {
  document.getElementById("tela-inicial").style.display = "none"
  document.getElementById("jogo").style.display = "block"
}

function escolher(item) {
  itemAtual = item
  const enigma = enigmas[item]

  if (enigma.resolvido) {
    descricao.textContent = "Você já resolveu esse enigma."
    imagem.src = enigma.imagem
    respostaInput.style.display = "none"
  } else {
    descricao.textContent = enigma.pergunta
    imagem.src = enigma.imagem
    respostaInput.style.display = "inline"
  }

  respostaInput.value = ""
  feedback.textContent = ""
}

function responder() {
  const resposta = respostaInput.value.trim().toLowerCase()
  const enigma = enigmas[itemAtual]

  if (enigma.resolvido) {
    feedback.textContent = "Esse enigma já foi resolvido."
    return
  }

  if (enigma.resposta.some(resp => resposta.includes(resp))) {
    feedback.textContent = "Acertou! Você encontrou uma chave escondida."
    enigma.resolvido = true
    somAcerto.play()
  } else {
    feedback.textContent = "Resposta incorreta. Tente novamente."
    somErro.play()
  }

  respostaInput.value = ""
}

function verificarSaida() {
  const todosResolvidos = Object.values(enigmas).every(e => e.resolvido)

  if (todosResolvidos) {
    somVitoria.play()
    document.getElementById("jogo").style.display = "none"
    document.getElementById("tela-final").style.display = "block"
  } else {
    feedback.textContent = "A porta ainda está trancada. Resolva todos os enigmas para escapar!"
    imagem.src = "img/porta.png"
  }
}
