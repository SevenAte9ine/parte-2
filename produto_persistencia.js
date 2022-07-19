//const Client = require('pg').Client;
const {Client} = require('pg');

const erroBD = { 
    mensagem: "Ignore, isso aparece por algum motivo.",
    numero: 500
};

const erroProdutoNaoEncontrado = {
    mensagem: "Produto nao encontrado",
    numero:404
};

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mesa27',
    database: 'crud_produtos'
};

//Iniciando o inserirProduto
function inserir(produto, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO produtos(nome, ano, autores, editora, alugado, alugador) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [produto.nome, produto.ano, produto.autores, produto.editora, produto.alugado, produto.alugador];

    cliente.query(sql, values, 
        function (err, res){
            console.log(err);
            callback(erroBD, res.rows[0]);
            cliente.end();
        })

}




function listar(callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "SELECT * FROM produtos";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);
            }
            else {
                let produtos = res.rows;
                callback(undefined, produtos);     
            }
            cliente.end();
        }
    )    
}

function buscarPorId(id, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "SELECT * FROM produtos WHERE id=$1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let produto = res.rows[0];
                callback(undefined, produto);
            }
            else {
                callback(erroProdutoNaoEncontrado, undefined);
            }

            cliente.end();
        }
    )    
}


function atualizar(id,produto, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE produtos SET nome=$1, ano=$2, autores=$3, editora=$4, alugado=$5, alugador=$6 WHERE id=$7 RETURNING *"    
    const values = [produto.nome, produto.ano, produto.autores, produto.editora, produto.alugado, produto.alugador, id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            console.log(err);
            callback(erroBD, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let produto = res.rows[0];
            callback(undefined, produto);
        }
        else {
            callback(erroProdutoNaoEncontrado, undefined);
        }

        cliente.end();        
    })
}

function deletar(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM produtos WHERE id=$1 RETURNING *"
    const values = [id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            console.log(err);
            callback(erroBD, undefined);                
    }
        else if (res.rows && res.rows.length > 0) {
            let produto = res.rows[0];
            callback(undefined, produto);
        }
        else {
            callback(erroProdutoNaoEncontrado, undefined);
    }

        cliente.end();        
    })

}

module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar
} 
