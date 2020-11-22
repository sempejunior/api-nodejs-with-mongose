const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({id: userId}, "testeSenha", {expiresIn: '7d'})
}

router.get('/', async (req, res) => {

    try {
        const users = await Users.find();
        return res.send(users);
    } catch (error) {
        res.send({ error: 'Erro na consulta de usuários' });
    }

});


router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ error: 'Dados insufientes' });
    }
    try {
        if (await Users.findOne({ email })) return res.send({ error: 'Usuário já registrado' });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});


    } catch (error) {
        res.send({ error: 'Erro ao buscar o usuário' });
    }
});



router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ error: 'Dados insufientes' });
    }

    try {
        //I used .select(+password) to return the value because in the model I put it to not return
        const user = await Users.findOne({ email }).select('+password');

        if (!user) res.send({ error: 'Erro na consulta de usuários' });

        const samePassword = await bcrypt.compare(password, user.password);

        if (!samePassword) return res.send({ error: 'Erro ao autenticar o usuário.' });

        user.password = undefined;

        return res.send({user, token: createUserToken(user.id)});
    } catch (error) {
        return res.send({ error: 'Erro ao buscar o usuário' });
    }
});

module.exports = router;