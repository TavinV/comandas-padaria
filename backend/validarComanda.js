const baseUrl = `http://localhost:3000/`
const comandaForm = document.getElementById(`comandaForm`)

comandaForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const id = document.getElementById("numeroComanda").value

    fetch(baseUrl + `comandas/${id}`).then(resposta => {return resposta.json()}).then(dados =>{
        if (!dados) {
            console.log(null)
        } else {
            console.log(dados)
            carregarInfoComanda(dados)
        }
    }).catch(e =>{
        alert('Comanda não encontrada.');
    })
})

const carregarInfoComanda = (comanda) =>{
        const produtosComanda = comanda.produtos;

        if (produtosComanda) {
            // Exibe os produtos da comanda
            const tbody = document.getElementById('produtosComanda');
            tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os itens

            produtosComanda.forEach(item => {
                const tr = document.createElement('tr');
                const preco = parseFloat(item.valor)
                const quantidade = parseFloat(item.quantidade)
                const subtotal = preco * quantidade

                tr.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.valor}</td>
                    <td>${subtotal}</td>
                `;
                tbody.appendChild(tr);
            });

            // Exibe a área com os resultados e o botão de limpar comanda
            document.getElementById('resultadoComanda').style.display = 'block';
        } else {
        }
}