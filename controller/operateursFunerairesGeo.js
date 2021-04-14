const mongoose = require('mongoose');
const { limitSearch } = require('../config/config.js');

var operateursFunerairesGeo = require('../models/operateursFunerairesGeo.js')

function verifyRequestBodyGeo(req) {
    let criteres = {}
    let countParam = 0;
    let maxDistance = 0;
    let x = 0;
    let y = 0;

    if (req.body.features[0].geometry.coordinates[0] != null && req.body.features[0].geometry.coordinates[1] != null) {

        if ((typeof req.body.features[0].geometry.coordinates[0] == 'number') || (typeof req.body.features[0].geometry.coordinates[1] == 'number')) {


            x = Number(req.body.features[0].geometry.coordinates[0])
            y = Number(req.body.features[0].geometry.coordinates[1])

            if (req.body.max_distance == null) {
                maxDistance = 10 * 1000
            } else {
                maxDistance = Number(req.body.max_distance) * 1000
            }

            if (req.body.limit == null) {
                limit = Number(limitSearch)
            } else {
                limit = Number(req.body.limit)
                if (limit > 300) {
                    limit = 300
                }
            }
            countParam += 1
        }
    }

    criteres = {
        location: {
            '$near': {
                '$geometry': {
                    type: 'Point',
                    coordinates: [x, y]
                },
                '$maxDistance': maxDistance,
            }
        }
    }

    conditions = { countParam: countParam, limit: limit, data: criteres }
    return conditions
}



module.exports.getOperateursFunerairesByGeo = (req, res, next) => {

    let conditions = {}


    conditions = verifyRequestBodyGeo(req);

    if (conditions.countParam == 0) {
        res.status(400).json({ code: 400, message: "format incorrect" });
    } else {
        operateursFunerairesGeo.find(conditions.data).limit(conditions.limit).then(geo_address => {
                if (!geo_address) {
                    res.status(404).json({ code: 404, message: "données non trouvées" });
                    //console.log("vide")
                } else {
                    if (geo_address.length == 0) {
                        res.status(404).json({ code: 404, message: "données non trouvées" });
                        //console.log("longueur = 0")
                    } else {
                        let message = {
                            hits: geo_address.length,
                            geometry: geo_address
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