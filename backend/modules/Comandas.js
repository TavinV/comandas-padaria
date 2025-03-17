import Produto from "./Produtos.js"

const baseURl = `http://localhost:3000`
const comandasURL = `${baseURl}/comandas`

class Comanda {
    static all = () => {
        return fetch(comandasURL)
            .then(res => res.json())
    }

    static create = (comanda) => {
        return fetch(comandasURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comanda)
        })
            .then(res => res.json())
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

    static delete = (comanda) => {
        return fetch(`${comandasURL}/${comanda.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }

    static get = (id) => {
        return fetch(`${comandasURL}/${id}`)
    }

    static addProduct = async (comanda_id, cod, qtd) => {
        const res = await this.get(comanda_id)
        const comanda = await res.json()

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