document.addEventListener('DOMContentLoaded', () => {
    const valorInput = document.getElementById('valor');
    const moedaOrigemSelect = document.getElementById('moeda-origem'); // Corrigido aqui
    const moedaDestinoSelect = document.getElementById('moeda-destino');
    const converterButton = document.getElementById('converter');
    const valorConvertidoElement = document.getElementById('valor-convertido');

    converterButton.addEventListener('click', async () => {
        const valor = parseFloat(valorInput.value);
        const moeda = moedaOrigemSelect.value;
        const destino = moedaDestinoSelect.value;

        if (!valor || valor <= 0) {
            alert('Por favor, insira um valor válido!');
            return;
        }

        try {
            converterButton.disabled = true;
            converterButton.textContent = 'Convertendo...';
            valorConvertidoElement.textContent = 'Calculando...';

            const resposta = await fetch(`/converter?valor=${valor}&de=${moeda}&para=${destino}`);
            const dados = await resposta.json();

            if (dados.erro) {
                throw new Error(dados.detalhes || dados.erro);
            }

            const valorFormatado = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: destino
            }).format(dados.valorConvertido);

            valorConvertidoElement.textContent = valorFormatado;
        } catch (erro) {
            console.error('Erro completo:', erro);
            alert('Erro ao converter moeda: ' + erro.message);
            valorConvertidoElement.textContent = '-';
        } finally {
            converterButton.disabled = false;
            converterButton.textContent = 'Converter';
        }
    });
});
