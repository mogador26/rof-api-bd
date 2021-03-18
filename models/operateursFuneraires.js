module.exports.convertFormat = function convertFormat(op) {

    //var json = { 'hits': " + op.length + , 'operateurs_funeraires':[';
    var response = null;

    for (i = 0; i < op.length; i++) {

        if (i == 0) {
            response = {
                "hits": op.length,
                "operateurs_funeraires": []
            }
        }

        if (op[i].Etranger == "0") {
            etranger = false;
        } else etranger = true;

        //'prestations': op[i].Prestations,

        //jsonLibPrestations = getlibPrestationPrestationsbyIds(op[i].Prestations);

        json = {
            'raison_sociale': op[i].Raison_sociale,
            'nom_commercial': op[i].Nom_commercial,
            'siret': null,
            'forme_juridique': op[i].Forme_juridique_Opérateur,
            'activites': op[i].Activités,
            'email': op[i].Courriel,
            'telephone_fixe': op[i].Téléphone,
            'mobile': op[i].Mobile,
            'prestations': op[i].Prestations,
            'adresse': {
                'libelle': op[i].Adresse,
                'complement_adresse': op[i].Complément_adresse,
                'code_postal': op[i].Code_postal,
                'code_departement': op[i].Département,
                'ville': op[i].Ville
            },
            'etranger': etranger
        }

        response.operateurs_funeraires.push(json);

    }

    return response;
}

function getlibPrestationPrestationsbyIds(ids) {

    let res = ids.split(";");
    let json = { "prestations": [] };


    console.log('debut');

    for (i = 0; i < res.length; i++) {
        lib = getlibPrestationPrestationsbyId(res[i]);

        jsonPrestations = {
            "code": res[i],
            "libelle": lib
        }
        console.log("jsonPrestations : " + JSON.stringify(jsonPrestations))
            //json.prestations.push(jsonPrestations);
    }

    return json;
}

function getlibPrestationPrestationsbyId(id) {


    const libPrestations = ['Transport de corps avant et après mise en bière', 'Organisation des obsèques', 'Soins de conservation', 'Fourniture des housses, des cercueils et de leurs accessoires, des urnes cinéraires', '', 'Gestion et utilisation des chambres funéraires', 'Fourniture des corbillards et des voitures de deuils', 'Fourniture de personnel et des objets et prestations nécessaires aux obsèques', 'Gestion d\'un crématorium']


    return libPrestations[id];
}