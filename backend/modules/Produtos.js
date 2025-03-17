const baseURl = `http://localhost:3000`
const produtosURL = `${baseURl}/produtos`

class Produto {
    static all = () => {
        return fetch(produtosURL)
            .then(res => res.json())
    }

    static create = (cod, nome, valor) => {
        return fetch(produtosURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": cod, nome, valor })
        })
            .then(res => res.json())
    }

    static update = (produto) => {
        return fetch(`${produtosURL}/${produto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
            .then(res => res.json())
    }

    static delete = (id) => {
        return fetch(`${produtosURL}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }

    static get = (id) => {
        return fetch(`${produtosURL}/${id}`).then(res => res.json())
    }

}

export default Produto;