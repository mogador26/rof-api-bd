const express = require('express')
const operateurs_funeraires = require('./data/rof-update.json')
const { port, windowRequest, maxRequestByIp, dirLog, userDB, passDB, uriDB } = require('./config/config.js');
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
const mongoose = require('mongoose');
const ops = require('./controller/operateursFuneraires.js');
const fs = require('fs')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const healthCheck = require('express-healthcheck');

// app
const app = express()
app.use(express.json())


var options = { useNewUrlParser: true, useUnifiedTopology: true };
const urlDB = "mongodb+srv://" + userDB + ":" + passDB + "@" + uriDB;
console.log(urlDB);

mongoose.connect(urlDB, options);
var myDB = mongoose.connection;

myDB.on('open', function() {
    console.log("Connexion à la base OK");
});


// limit access by IP
const limiter = rateLimit({
    windowMs: windowRequest,
    max: maxRequestByIp, //limit each IP to 100 requests per windowMs
    message: "trop d'appels réalisés, veuillez essayer dans quelques minutes"

});

var dir = __dirname + dirLog

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// handle the limiter only for the api
app.use("/api", limiter);


// Serve Favicon
var favicon = require('serve-favicon');
app.use(favicon('favicon.ico'));

// Middleware
//log
app.use(morgan("common"));

// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(dir, 'access.log'), { flags: 'a' })
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }));

// ressource de type /search?q=
app.get('/api/v1/operateurs_funeraires/search', ops.getOperateursFunerairesBySearch, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send();
})

// ressource et filtre paramètres 
app.get('/api/v1/operateurs_funeraires', ops.getOperateursFunerairesByParam, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send();
})


//swagger api operateurs funéraires
app.use('/api/v1/operateurs_funeraires/api-docs', function(req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());


//healthcheck
const serverStatus = () => {
    return {
        etat: 'up',
        base: mongoose.STATES[mongoose.connection.readyState],
        date: new Date()
    }
};

app.use('/api/v1/operateurs_funeraires/healthcheck', require('express-healthcheck')({
    healthy: serverStatus
}));


app.listen(port, () => {
    console.log("Serveur à l'écoute sur le port " + port)
})