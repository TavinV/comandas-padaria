# Comandas de Padaria

Este projeto tem como objetivo gerenciar comandas em uma padaria, permitindo criar e alterar comandas, além de gerenciar produtos e registrar pagamentos.

## Funcionalidades

- Criar e alterar comandas
- Criar, alterar e deletar produtos
- Salvar informações de pagamentos de comandas

## Requisitos

- Node.js instalado

## Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seuusuario/comandas-padaria.git
   cd comandas-padaria
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Iniciando o JSON Server

Para iniciar o servidor JSON, execute o seguinte comando:
```sh
npx json-server -p 3000 db.json
```

Isso iniciará um servidor local na porta 3000, onde os dados das comandas e produtos serão armazenados e gerenciados.

