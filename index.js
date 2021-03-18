const express = require('express')
const operateurs_funeraires = require('./data/rof-update.json')
const { port, windowRequest, maxRequestByIp, dirLog } = require('./config/config.js');
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
const ops = require('./models/operateursFuneraires.js');
const fs = require('fs')
const path = require('path')

// app 
const app = express()
app.use(express.json())

// limit
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

app.get('/api/v1/operateurs_funeraires', (req, res) => {

    if (req.query.code_departement != null) {
        operateurs = getByCodeDepartement(req);
        if (operateurs != null) {
            json = ops.convertFormat(operateurs);
            //res.status(200).json(json);
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            if (json != null) {
                res.status(200).json(json);
            } else {
                res.status(404).json({ 'message': 'aucune information' });
            }
            //res.status(200).send(JSON.stringify(json));
        } else {
            res.status(404).json({ 'message': 'aucune information' });
        }
    } else {

        if (req.query.code_postal != null) {
            operateurs = getByCodePostal(req);
            if (operateurs != null) {
                json = ops.convertFormat(operateurs);
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                if (json != null) {
                    res.status(200).json(json);
                } else {
                    res.status(404).json({ 'message': 'aucune information' });
                }

            } else {
                res.status(404).json({ 'message': 'aucune information' });
            }
        } else {
            json = convertFormat(operateurs_funeraires);
            res.status(200).json(json);
        }
    }
})

app.get('/api/v1/operateurs_funeraires/status', (req, res) => {

    res.status(200).json({ 'status': 'OK' })
});

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