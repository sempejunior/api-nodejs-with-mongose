const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require ('bcrypt');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({ error: 'Erro na consulta de usuários' });
        return res.send(data);
    });
})

router.post('/', (req, res) => {
    const { email, password } = req.body;
  
    if ( !email || !password) {
        return res.send({ error: 'Dados insufientes' });
    }
    
    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar o usuário' });
        if (data) return res.send({ error: 'Usuário já registrado' });

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao buscar o usuário' });
            data.password = undefined;
            return res.send(data);
        });

    });

});

router.post('/auth', (req,res)=>{
    const {email, password} = req.body;

    if ( !email || !password) {
        return res.send({ error: 'Dados insufientes' });
    }

    Users.findOne({ email }, (err, data) => {
        if (err|| !data) return res.send({ error: 'Erro ao buscar o usuário' });

       bcrypt.compare(password, data.password, (err,same)=>{

        if(!same) return res.send({ error: 'Erro ao autenticar o usuário.' });
        data.password = undefined;
        return res.send(data);
       });

    }).select('+password');

});

module.exports = router;