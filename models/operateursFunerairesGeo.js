const mongoose = require('mongoose');

var operateursFunerairesGeoSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        id_operateur_funeraire: mongoose.Schema.Types.ObjectId,
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        properties: {
            query: String,
            label_find: String
        }
    }) //, { retainKeyOrder: true })

// Compile model from schema
module.exports = mongoose.model('geo_addresses', operateursFunerairesGeoSchema);