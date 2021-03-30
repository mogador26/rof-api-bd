const mongoose = require('mongoose');
const { limitSearch } = require('../config/config.js');

var operateursFuneraires = require('../models/operateursFuneraires.js')

function verifySearchParams(req) {
    var criteres = {}
    var countParam = 0;
    var requiredParam = false;
    var limit = 0;

    if (req.query.code_departement != null) {
        criteres = { "adresse.code_departement": req.query.code_departement }
        countParam++;
    }

    //Si code_postal et code_departement priorité est donnée au code_postal
    if (req.query.code_postal != null) {
        criteres = { "adresse.code_postal": req.query.code_postal };
        countParam++
    }

    //search text 
    if (req.query.q != null) {
        countParam++;
        requiredParam = true;
        if (criteres == null) {
            criteres = { $text: { $search: req.query.q } };
        } else {
            criteres = { $and: [{ $text: { $search: req.query.q } }, criteres] };
        }
    }

    var sortParam;
    var sortParamDesc;

    //query sort
    if (req.query.sort != null) {
        //not implemented        
        sortParam = req.query.sort.split(",");
    }
    //query sort desc
    if (req.query.desc != null) {
        //not implemented        
        sortParamDesc = req.query.desc.split(",");


    }

    var sortLabel = "";

    //case handling sort
    // not implemented
    if (sortParam != null) {
        for (var item in sortParam) {
            elementSort = sortParam[item];
            order = 1;

            if (sortParamDesc != null) {
                if (sortParamDesc[item] == elementSort) {
                    order = -1;
                }
            }

            if (elementSort == "code_departement") {
                sortLabel = { 'adresse.code_departement': order }
            }

            if (elementSort == "code_postal") {
                sortLabel = { 'adresse.code_postal': order }
            }

            if (elementSort == "nom_commercial") {
                sortLabel = { nom_commercial: order };
            }

            if (elementSort == "raison_sociale") {
                sortLabel = { raison_sociale: order };
            }
            if (elementSort == "_id") {
                sortLabel = { _id: order };
            }

        }
    }


    if (req.query.limit != null) {

        if (Number(req.query.limit) == 'Nan') {
            limit = Number(limitSearch)
        } else {
            limit = Number(req.query.limit)
        }
    }

    conditions = { countParam: countParam, sortParam: sortLabel, requiredParam: requiredParam, limit: limit, data: criteres }

    return conditions
}


function verifyParams(req) {
    var criteres = {}
    var countParam = 0;
    var limit = 0;

    if (req.query.code_departement != null) {
        countParam++;
        criteres = { "adresse.code_departement": req.query.code_departement }
    }

    //Si code_postal et code_departement priorité est donnée au code_postal
    if (req.query.code_postal != null) {
        countParam++;
        criteres = { "adresse.code_postal": req.query.code_postal };
    }

    if (req.query.prestations != null) {
        countParam++;
        if (criteres == null) {
            criteres = { "prestations.libelle": req.query.prestations }
        } else {
            criteres = { $and: [{ "prestations.libelle": req.query.prestations }, criteres] }
        }
    }

    if (Number(req.query.limit) == 'Nan') {
        limit = Number(limitSearch)
    } else {
        limit = Number(req.query.limit)
    }

    conditions = { countParam: countParam, limit: limit, data: criteres }

    return conditions
}


module.exports.getOperateursFunerairesBySearch = (req, res, next) => {

    var conditions;

    conditions = verifySearchParams(req);

    if ((conditions.countParam == 0) || (conditions.requiredParam == false)) {
        res.status(400).json({ code: 400, message: "format incorrect" });
    } else {
        operateursFuneraires.find(conditions.data).sort(conditions.sortParam).limit(conditions.limit).then(operateurs_funeraires => {
                if (!operateurs_funeraires) {
                    res.status(404).json({ code: 404, message: "données non trouvées" });
                } else {
                    if (operateurs_funeraires.length == 0) {
                        res.status(404).json({ code: 404, message: "données non trouvées" });
                    } else {
                        let message = {
                            hits: operateurs_funeraires.length,
                            operateurs_funeraires
                        }
                        res.status(200).json(message);
                    }
                }
            })
            .catch(
                (error) => {
                    console.log(error)
                    res.status(500).json({ code: 500, message: error });
                }
            );
    }
};


module.exports.getOperateursFunerairesByParam = (req, res, next) => {

    var conditions

    conditions = verifyParams(req);


    if (conditions.countParam == 0) {
        res.status(400).json({ code: 400, message: "format incorrect" });
    } else {

        operateursFuneraires.find(conditions.data).limit(conditions.limit).then(operateurs_funeraires => {
                if (!operateurs_funeraires) {
                    res.status(404).json({ code: 404, message: "données non trouvées" });
                } else {
                    if (operateurs_funeraires.length == 0) {
                        res.status(404).json({ code: 404, message: "données non trouvées" });
                    } else {
                        let message = {
                            hits: operateurs_funeraires.length,
                            operateurs_funeraires
                        }
                        res.status(200).json(message);
                    }
                }
            })
            .catch(
                (error) => {
                    console.log(error)
                    res.status(500).json({ code: 500, message: error });
                }
            );

    }
};