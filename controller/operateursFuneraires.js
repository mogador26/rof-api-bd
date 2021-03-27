const mongoose = require('mongoose');
var operateursFuneraires = require('../models/operateursFuneraires.js')

module.exports.getOperateursFunerairesBySearch = (req, res, next) => {


    res.status(400).json({ code: 400, message: "service non implémenté" });

}


module.exports.getOperateursFunerairesByCodePostal = (req, res, next) => {

    let criteres = { "adresse.code_postal": req.query.code_postal };

    operateursFuneraires.find(criteres).then(operateurs_funeraires => {
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

};