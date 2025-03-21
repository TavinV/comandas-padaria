import Comanda from "../modules/Comandas.js";

const form_comanda = document.getElementById('form-comanda');
form_comanda.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const nome = document.getElementById('cliente').value.trim();

    const resposta = await Comanda.create(nome)
    const [id, error] = resposta

    if (!id){
        alert("Não foi possível criar a comanda! \n" + error)
    } else {
        window.location.href = `../../pages/comanda.html?id=${id}`
    }
})