const express = require('express');
const conexao = require('../conexao');
const mongoose = require('../model/heroi');
const bodyParser = require('body-parser');

// variaveis globais
route = express(express.json);
const heroi = mongoose.model('heroi');
route.use(bodyParser.json());

// Rotas
route.get('/heroi', (req, res) => {
    heroi.find((err, heroi) => {
        if (err){
            res.send(err);
            res.status(505);
        } else {
            res.status(200);
            res.json(heroi);    
        }
    })
});

route.get('/heroi/:heroi_id', (req, res) => {
    heroi.findOne({_id:req.params.heroi_id}, (err, heroi) => {
        if (err){
            res.send(err);
            res.status(405);
        } else {
            res.status(200);
            res.json(heroi);    
        }
    })
})

route.put('/heroi/:heroi_id', (req, res) => {
    var id =  req.params.heroi_id;
    heroi.updateOne({_id: id},
                       {$set: { nome: req.body.nome,
                                idade: req.body.idade,
                                poder: req.body.poder,
                                sexo: req.body.sexo,
                            }}, (err, heroi) => {
                                    if (err){
                                        res.send(err);
                                        res.status(505);
                                    } else {
                                        res.status(201);
                                        res.json("Heroi Salvo.");    
                                    }                           
                                })
})

route.delete('/heroi/:heroi_id', (req, res) => {
    var id =  req.params.heroi_id;
    heroi.deleteOne({_id: id}, (err, heroi) =>{
        if (err){
            res.send(err);
            res.status(405);
        } else {
            res.status(200);
            res.json("Heroi Removido com sucesso.");    
        }        
    })
})

route.post('/heroi', (req, res) => {
    var pessoa = new heroi();
    pessoa.nome = req.body.nome;
    pessoa.idade = req.body.idade;
    pessoa.poder = req.body.poder;
    pessoa.sexo = req.body.sexo;
    

    pessoa.save(pessoa, (err, heroi) => {
        if (err){
            res.send(err);
            res.status(400);
        } else {
            res.status(201);
            res.json(heroi);    
        }
    })
})

// Cria servidor básico
route.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})