const produtoRepositorio = require('../persistencia/produto_persistencia.js')

function inserir (produto, callback) {
    if(!produto || !produto.nome || !produto.ano){
        const erro = { 
            mensagem: "Nome ou ano vazios!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else {
        produtoRepositorio.inserir(produto, callback);
    }  
}

function listar (callback) {
    produtoRepositorio.listar(callback);
}

function buscarPorId(id, callback){
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else { 
        produtoRepositorio.buscarPorId(id, callback);
    }
}

function atualizar(id, produto, callback) {
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if(!produto || !produto.nome || !produto.ano) {
        const erro = { 
            mensagem: "Os campos nome ou ano devem ser preenchidos!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else { 
        produtoRepositorio.atualizar(id, produto, callback);
    }

}


function deletar(id, callback) {
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else {
        produtoRepositorio.deletar(id,callback);
    }
}



module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar
} 

