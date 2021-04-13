// Importation
const express = require('express');
const apiRouter = require('./routes/apiRouter').router;
require('dotenv').config();

// Intantiation du server
const server = express();

// Configuration Body Parser
server.use(express.urlencoded({extended: true}));
server.use(express.json());

// Configuration des routes
server.get('/' , function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('');
});

server.use('/v1', apiRouter)


server.listen(3000, function(){
    console.log('Server en écoute');
});