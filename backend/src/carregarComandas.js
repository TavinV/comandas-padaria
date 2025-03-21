import Comanda from "../modules/Comandas.js";

async function carregarComandas(){
    const comandas = await Comanda.all()
    const listaComandas = document.getElementById("lista-comandas")
    listaComandas.innerHTML = ""

    comandas.sort((a, b) => a.id - b.id);

    comandas.forEach(c =>{
        const qtdProdutos = c.produtos.length
        const cardComandas = `
        <a href="comanda.html?id=${c.id}" class="card-comanda">
                <h3>Comanda #${c.id}</h3>
                <p>Itens: ${qtdProdutos}</p>
                <p>Cliente: ${c.nome}</p>
            </a>
        `

        listaComandas.innerHTML += cardComandas

    })
}

carregarComandas()