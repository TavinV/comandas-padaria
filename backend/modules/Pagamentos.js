const baseURl = `http://localhost:3000`
const pagamentosURL = `${baseURl}/pagamentos`

class Pagamento {
    static async registrar(valor, metodoPagamento){
        let dataHora = new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ' -');
       
        const recibo = {
            "data": dataHora,
            valor,
            "metodo_pagamento": metodoPagamento
        }
        try {
            fetch(pagamentosURL, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(recibo)
           })
               .then(res => res.json())

            return true
            
        } catch (error) {
            return error   
        }
    }
}

export default Pagamento;