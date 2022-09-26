const express = require('express')
const { port, windowRequest, maxRequestByIp, urlDB } = require('./config/config.js');
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const ops = require('./controller/operateursFuneraires.js');
const opsGeo = require('./controller/operateursFunerairesGeo')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

var healthCheck = require('express-healthcheck');

// app
const app = express()
app.use(express.json())

let options = { useNewUrlParser: true, useUnifiedTopology: true };

console.log(urlDB);

mongoose.connect(urlDB, options);
var myDB = mongoose.connection;

if (process.env.NODE_ENV != 'production') {
    mongoose.set("debug", true);
}

myDB.on('open', function() {
    console.log("Connexion à la base OK");
});


// limit access by IP
const limiter = rateLimit({
    windowMs: windowRequest,
    max: maxRequestByIp, //limit each IP to 100 requests per windowMs
    message: "trop d'appels réalisés, veuillez essayer dans quelques minutes"

});


//Middleware

// handle the limiter only for the api et slides-api
app.use("/api", limiter);
app.use('/slides-api',limiter);

// Serve Favicon
var favicon = require('serve-favicon');
app.use(favicon('favicon.ico'));


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

// ressource de recherche par coordonnées géographiques

app.post('/api/v1/operateurs_funeraires/geo/', opsGeo.getOperateursFunerairesByGeo, (req, res, next) => {

    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    // recommendations owasp http headers
    // https://owasp.org/www-project-secure-headers/#div-bestpractices
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.removeHeader('X-Powered-By');
    res.send();

})

app.get('/slides-api', function(req, res) {
    res.sendFile(__dirname + '/html/slides-deck-api-rof.html');
});

// Middleware
// swagger api operateurs funéraires
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

// ressource par identifiant technique
app.get('/api/v1/operateurs_funeraires/:id', ops.getOperateursFunerairesById, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    // recommendations owasp http headers
    // https://owasp.org/www-project-secure-headers/#div-bestpractices
    res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.removeHeader('X-Powered-By');
    res.send();
})

app.listen(port, () => {
    console.log("Serveur à l'écoute sur le port " + port)
})
