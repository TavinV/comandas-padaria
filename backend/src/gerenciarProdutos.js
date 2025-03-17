import Produto from "../modules/Produtos.js";

const tbProdutos = document.getElementById('tb-produtos')
const renderProdutos = async () => {
    const produtos = await Produto.all();
    tbProdutos.innerHTML = '';
    produtos.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>R$ ${produto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
        
        <td>
            <button class="btn-acao editar" data-cod="${produto.id}">Editar</button>
            <button class="btn-acao excluir" data-cod="${produto.id}">Excluir</button>
        </td>
        `;
        tbProdutos.appendChild(row);
    });

    // Adicionando eventos aos botões depois que a tabela for criada
    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', () => editarProduto(btn.dataset.cod));
    });

    document.querySelectorAll('.excluir').forEach(btn => {
        btn.addEventListener('click', () => excluirProduto(btn.dataset.cod));
    });
}

renderProdutos();

const formProduto = document.getElementById('form-produto')
formProduto.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formProduto);

    const cod = formData.get('cod');
    const nome = formData.get('nome');
    const valor = formData.get('valor');

    await Produto.create(cod, nome, valor);
    renderProdutos();
    formProduto.reset();
})

//Overlay de popup
const overlay = document.getElementById('overlay');
function editarProduto(cod) {
    const popupEdicao = document.getElementById('popup-edicao');
    popupEdicao.style.display = 'block';
    overlay.style.display = 'block';

    const formEdicao = document.getElementById('form-edicao');
    const editCod = document.getElementById('edit-cod');
    const editNome = document.getElementById('edit-nome');
    const editValor = document.getElementById('edit-valor');

    Produto.get(cod).then(produto => {
        editCod.value = produto.id;
        editNome.value = produto.nome;
        editValor.value = produto.valor;
    });

    formEdicao.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(formEdicao);
        const cod = formData.get('edit-cod');
        const nome = formData.get('edit-nome');
        const valor = formData.get('edit-valor');

        await Produto.update({ "id": cod, nome, valor });

        renderProdutos();
        popupEdicao.style.display = 'none';
        overlay.style.display = 'none';
    });

}

function excluirProduto(cod) {
    const popupExclusao = document.getElementById('popup-exclusao');
    popupExclusao.style.display = 'block';
    overlay.style.display = 'block';

    const btnSim = document.getElementById('btn-confirmar-exclusao');
    btnSim.addEventListener('click', async () => {
        await Produto.delete(cod);
        renderProdutos();
        popupExclusao.style.display = 'none';
        overlay.style.display = 'none';
    });
}