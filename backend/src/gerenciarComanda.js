import Comanda from "../modules/Comandas.js";
import Produto from "../modules/Produtos.js";
import Pagamento from "../modules/Pagamentos.js";


const id = (elId) =>{
    return document.getElementById(elId)
}

async function carregarSelect (){
    const produtos = await Produto.all()
    const select = id("produto")

    produtos.forEach(p =>{
        const option = document.createElement("option")
        option.value = p.id
        option.innerText = p.nome + " - R$ " + p.valor
        select.appendChild(option)
    })
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
                <td style="text-align: center;">
                    <button class="btn-remover" data-cod="${produto.id}"><i class='bx bxs-trash'></i></button>
                </td>
            </tr>
        `;
        tabelaBody.insertAdjacentHTML('beforeend', novaLinha);
    });

    // Atualiza o total da comanda
    tabelaFoot.textContent = `R$ ${totalComanda.toFixed(2)}`;
}
        

const btnFecharComanda = id('btn-fechar-comanda');
const btnCancelar = id('btn-cancelar');
const overlay = id('overlay');
const popupPagamento = id('popup-pagamento');

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


// JavaScript para controlar o popup de pagamento e adicionar produtos
document.addEventListener('DOMContentLoaded', async () => {
    const formAdicionarProduto = id('form-adicionar-produto');

    const urlParams = new URLSearchParams(window.location.search);
    const idComanda = urlParams.get('id');

    //Carregando as info da comanda
    let comanda

    try {
        comanda = await Comanda.get(idComanda)
    } catch (error) {
        window.location.href = '../../pages/comandas.html'
    }
    
    const tituloComanda = document.querySelector('h1')
    tituloComanda.innerText = `Comanda #${comanda.id} - ${comanda.nome}`

    gerarTabela(comanda)
    carregarSelect()

    // Enviar formulário de pagamento
    const formPagamento = document.getElementById('form-pagamento');
    formPagamento.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formaPagamento = document.getElementById('forma-pagamento').value;
        
        alert(`Pagamento confirmado via ${formaPagamento}. Comanda fechada!`);

        let totalVenda = 0 
        comanda.produtos.forEach(p =>{
            totalVenda += p.valor * p.quantidade 
        })

        const resposta = await Pagamento.registrar(totalVenda, formaPagamento)
        Comanda.delete(idComanda)
''

        popupPagamento.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Adicionar produto à comanda
    formAdicionarProduto.addEventListener('submit', async (e) => {
        e.preventDefault();
        const produtoSelecionado = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;

        if (!produtoSelecionado || !quantidade) {
            alert('Selecione um produto e insira a quantidade.');
            return;
        }
        
        const produto = await Produto.get(produtoSelecionado)
        await Comanda.addProduct(idComanda, produto.id, quantidade)

        gerarTabela()
        formAdicionarProduto.reset();
       
    });
    
    const botoesRemover = document.querySelectorAll('.btn-remover');
         botoesRemover.forEach(botao => {
             botao.addEventListener('click', () => {
                 const codProduto = botao.getAttribute('data-cod');
                 Comanda.removeProduct(idComanda, codProduto)
             });
    });
});