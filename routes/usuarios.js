const express = require ('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/cadastrar', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error : error}) }
        bcrypt.hash(req.body.senha, 10, (errBcrypt), hash) ; {
            if(errBcrypt) { return res.status(500).send({error: errBcrypt})}
            conn.query('INSERT INTO usuarios (telefone, senha) VALUES (? , ?)', [req.body.telefone, hash])
            (error, results) ; {
                conn.release();
                if (error) {return res.status(500).send({error : error})}
                response = {
                    mensagem: 'Usuário cadastrado com sucesso',s
                    usuarioCriado: {
                        id_usuario: results.insertId,
                        nome: req.body.nome,
                        telefone: req.body.telefone
                    }
                };
                return res.status(201).send(response);
            };
        };
    });
});

router.post('/login',(req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error){ return res.status(500).send({ error: error}) }
        const query = 'SELECT * FROM usuarios WHERE telefone = ? ';
        conn.query(query,[req.body.telefone], (error, results, fields)=>{
            conn.release();
            if (error){ return res.status(500).send({ error: error}) }
            if (results.lenght < 1){
                return res.status(401).send({mensagem: 'Falha na autenticação'})
            };
            bcrypt.compare(req.body.senha, results[0].senha, [err, res] => {
                if (err){
                    return res.status(401).send({mensagem: 'Falha na autenticação'})
                },
                if (result){
                    const token = jwt.sign({
                        id_usuario: result[0].id_usuario,
                        nome: result[0].nome,
                        telefone: result[0].telefone
                    }, process.env.JWT_KEY,{
                        expiresIn: "15min"
                    });
                    return result.status(200).send({
                        mensagem: 'Usuário cadastrado com sucesso',
                        token: token
                    });
                },
                return res.status(402).send({mensagem: 'Falha na autenticação'}),
            });
        });
    });
});

module.exports = router;