const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const login = require('../middleware/login');

//Retorna todos os produtos comprados pelo usuario
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usar o GET dentro da rota de produtos'
    });
});

//Insere um produto
router.post('/', login, (req, res, next) => {
  
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

//Retorna um produto especifico
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    res.status(202).send({
        mensagem: 'Usar o GET de um produto especifico',
        id: id
    });
});

//Altera um produto comprado pelo ususario
router.patch('/', login, (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usar o PATCH dentro da rota de produtos'
    });
});

//Deleta um produto comprado pelo usuario
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usar o DELETE dentro da rota de produtos'
    });
});

module.exports = router;

