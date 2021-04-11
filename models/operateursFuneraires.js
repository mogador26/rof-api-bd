const mongoose = require('mongoose');

var operateursFunerairesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    raison_sociale: String,
    nom_commercial: String,
    numero_siren: String,
    forme_juridique: String,


    activites: String,
    prestations: [{
        code: String,
        libelle: String
    }],
    prestations_sous_traitees: String,
    courriel: String,
    telephone: String,
    telephone_mobile: String,
    adresse: {
        libelle: String,
        complement: String,
        code_postal: String,
        code_departement: String,
        ville: String,
    },
    etranger: Boolean
}, { retainKeyOrder: true })


// Compile model from schema
module.exports = mongoose.model('operateurs_funeraires', operateursFunerairesSchema);