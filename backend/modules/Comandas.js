import Produto from "./Produtos.js"

const baseURl = `http://localhost:3000`
const comandasURL = `${baseURl}/comandas`

class Comanda {
    static all = () => {
        return fetch(comandasURL)
            .then(res => res.json())
    }

    static create = async (nome) => {
        const comandas = await this.all();
        console.log(comandas);

        // Função para encontrar o menor ID disponível
        const findNextAvailableId = (comandas) => {
            // Criar um array com os IDs que já estão ocupados
            const idsOcupados = comandas.map(c => parseInt(c.id));
            let nextId = 1;

            // Loop para encontrar o menor ID disponível
            while (idsOcupados.includes(nextId)) {
                nextId++;
            }

            return nextId;
        }

        const proximoId = findNextAvailableId(comandas);

        const comanda = {
            nome,
            id: proximoId,
            produtos: []
        }

        try {
            await fetch(comandasURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comanda)
            });

            return [proximoId, null];
        } catch (error) {
            return [null, error];
        }
        }


    static update = (comanda) => {
        return fetch(`${comandasURL}/${comanda.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comanda)
        })
            .then(res => res.json())
    }

    static delete = (id) => {
        return fetch(`${comandasURL}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }

    static get = (id) => {
        return fetch(`${comandasURL}/${id}`)
            .then(res => res.json())
    }

    static addProduct = async (comanda_id, cod, qtd) => {
        const comanda = await this.get(comanda_id)

        const produtoExistente = comanda.produtos.find(p => p.cod === cod)
        if (produtoExistente) {
            produtoExistente.qtd += qtd
        } else {
            Produto.get(cod).then((p) => {
                p.quantidade = qtd
                comanda.produtos.push(p)
            })
        }

        return this.update(comanda)
    }

    static removeProduct = async (comanda_id, cod) => {
        const res = await this.get(comanda_id)
        const comanda = await res.json()
        const index = comanda.produtos.findIndex(p => p.cod === cod)

        if (index !== -1) {
            comanda.produtos.splice(index, 1)
        }

        return this.update(comanda)
    }
}

export default Comanda;