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
// app 
const app = express()
app.use(express.json())


// connect database
/*var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};*/

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
    message: "Too many accounts created from this IP, please try again after a minute"

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
app.get('/api/v1/operateurs_funeraires', ops.getOperateursFunerairesByCodePostal, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send();

})



app.get('/api/v1/operateurs_funeraires/status', (req, res) => {

    res.status(200).json({ status: 'OK' })
});


//swagger api operateurs
app.use('/api/v1/operateurs_funeraires/api-docs', function(req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());



app.listen(port, () => {
    console.log("Serveur à l'écoute sur le port " + port)
})

function getByCodeDepartement(req) {
    const code_departement = req.query.code_departement
    const operateurs = operateurs_funeraires.filter(operateurs => operateurs.Département === code_departement)
    return operateurs;
}

function getByCodePostal(req) {
    const code_postal = req.query.code_postal
    const operateurs = operateurs_funeraires.filter(operateurs => operateurs.Code_postal === code_postal)
    return operateurs;
}