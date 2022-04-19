const express = require('express');
const app = express();
const morgan = require('morgan');
const { restart } = require('nodemon');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaUsuarios = require('./routes/usuarios');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/produtos', rotaProdutos);
app.use('/usuarios', rotaUsuarios);


app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


const maskTelefone = {
    telefone (value) {
        return value
            .replace(/\D/g,'')
            .replace(/^(\d)/,"+$1")
            .replace(/(.{3})(\d)/,"$1($2")
            .replace(/(.{6})(\d)/,"$1)$2");
        if (this.telefone.length <= 12){
        
        }
    }
};

document.querySelector('input').forEach(($input) => {
    const field = $input.dataset.js;

    $input.addEventListener('input', (e)=>{
        e.target.value = maskTelefone[field](e.target.value)
    });
});

document.getElementById('nome').addEventListener('keyup', (e) => {
    const inputNome = ev.target;
    inputNome.value = input.value.toUpperCase();
});

module.exports = app;