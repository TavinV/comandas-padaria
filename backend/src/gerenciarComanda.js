import Comanda from "../modules/Comandas.js";

const id = (elId) =>{
    return document.getElementById(elId)
}

// Função para gerar a tabela
function gerarTabela(comanda) {
    const tabelaBody = document.querySelector('.tabela-comanda tbody');
    const tabelaFoot = document.querySelector('.tabela-comanda tfoot td:last-child');

    // Limpa o conteúdo atual da tabela
    tabelaBody.innerHTML = '';

    let totalComanda = 0;

    // Preenche a tabela com os produtos da comanda
    comanda.produtos.forEach(produto => {
        const subtotal = produto.quantidade * produto.valor;
        totalComanda += subtotal;

        const novaLinha = `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            </tr>
        `;
        tabelaBody.insertAdjacentHTML('beforeend', novaLinha);
    });

    // Atualiza o total da comanda
    tabelaFoot.textContent = `R$ ${totalComanda.toFixed(2)}`;
}



// JavaScript para controlar o popup de pagamento e adicionar produtos
document.addEventListener('DOMContentLoaded', async () => {
    const btnFecharComanda = id('btn-fechar-comanda');
    const popupPagamento = id('popup-pagamento');
    const overlay = id('overlay');
    const btnCancelar = id('btn-cancelar');
    const formAdicionarProduto = id('form-adicionar-produto');
    const tabelaProdutos = document.querySelector('.tabela-comanda tbody');

    const urlParams = new URLSearchParams(window.location.search);
    const idComanda = urlParams.get('id');

    //Carregando as info da comanda

    const comanda = await Comanda.get(idComanda)
    console.log(comanda)
    
    const tituloComanda = document.querySelector('h1')
    tituloComanda.innerText = `Comanda #${comanda.id} - ${comanda.nome}`

    gerarTabela(comanda)



    // Abrir popup ao clicar em "Fechar Comanda"
    btnFecharComanda.addEventListener('click', () => {
        popupPagamento.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Fechar popup ao clicar em "Cancelar" ou no overlay
    btnCancelar.addEventListener('click', () => {
        popupPagamento.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        popupPagamento.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Enviar formulário de pagamento
    const formPagamento = document.getElementById('form-pagamento');
    formPagamento.addEventListener('submit', (e) => {
        e.preventDefault();
        const formaPagamento = document.getElementById('forma-pagamento').value;
        
        
        alert(`Pagamento confirmado via ${formaPagamento}. Comanda fechada!`);


        popupPagamento.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Adicionar produto à comanda
    formAdicionarProduto.addEventListener('submit', (e) => {
        e.preventDefault();
        const produtoSelecionado = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;

        if (!produtoSelecionado || !quantidade) {
            alert('Selecione um produto e insira a quantidade.');
            return;
        }

        // Exemplo de adição de produto à tabela
        const produtoTexto = document.getElementById('produto').selectedOptions[0].text;
        const [nomeProduto, valorUnitario] = produtoTexto.split(' - ');
        const subtotal = (parseFloat(valorUnitario.replace('R$ ', '')) * parseInt(quantidade)).toFixed(2);

        const novaLinha = `
            <tr>
                <td>${nomeProduto}</td>
                <td>${quantidade}</td>
                <td>${valorUnitario}</td>
                <td>R$ ${subtotal}</td>
            </tr>
        `;
        tabelaProdutos.insertAdjacentHTML('beforeend', novaLinha);

        // Atualizar o total da comanda (exemplo simples)
        const totalAtual = parseFloat(document.querySelector('.tabela-comanda tfoot td:last-child').textContent.replace('R$ ', ''));
        const novoTotal = (totalAtual + parseFloat(subtotal)).toFixed(2);
        document.querySelector('.tabela-comanda tfoot td:last-child').textContent = `R$ ${novoTotal}`;

        // Limpar o formulário
        formAdicionarProduto.reset();
    });
});