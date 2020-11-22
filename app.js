const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
require('dotenv/config')


const url = process.env.MONGO_CONNECTION;
const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url,options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=>{
    console.log('Erro na conexão', err);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('App disconectada do DB');
});

mongoose.connection.on('connected', ()=>{
    console.log('App conectada ao DB');
});


//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);
module.exports = app;