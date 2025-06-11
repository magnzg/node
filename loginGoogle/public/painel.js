// Busca as informações do usuário do servidor
fetch('/api/usuario')
    .then(resposta => resposta.json())
    .then(usuario => {
        // Atualiza o nome do usuário na página
        document.getElementById('nome-usuario').textContent = usuario.displayName;
        // Atualiza o email do usuário na página
        document.getElementById('email-usuario').textContent = usuario.emails[0].value;
    })
    .catch(erro => {
        console.error('Erro ao buscar dados do usuário:', erro);
        // Redireciona para a página inicial em caso de erro
        window.location.href = '/';
    }); 