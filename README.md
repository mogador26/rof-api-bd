### API ROF With MongoDB

## Objectif

L'objectif est d'exposer le référentiel ROF sous forme d'API. Les données sont cette fois ci exposées dans une base de donnée MongoDB.
Pour ce cas Mongo Atlas est utilisé sans les spécificités de recherche floue offertes par cette solution 

  - ADU : 
    - adresses géocodées :
      - à charger dans le projet [rof-load-bd](https://github.com/mogador26/rof-load-bd.git),
      - à traiter via mongoose et geoSearch
    - ajout du numéro de siret
    - traitement des secrets d'accès à la base de données

# Pré-requis

**node** : v14

# Installation

`git clone https://github.com/mogador26/rof-api-bd.git`

- debuggage en mode dev
`npm install nodemon --save-dev -g`

- installation des packages
`npm install`

  - **morgan** : traitement des logs
  - **serve-favicon**
  - **express-rate-limit** : limite d'accès par IP
  - **dotenv** : chargement des variables d'environnement
  - **swagger-ui-express** : chargement du swagger
  - **yamljs** : prise en compte du format yaml pour le swagger
  - **mongoose** : accès à une base de données mongodb
  - **express-healthcheck** : etat de l'api.


# Exécution

- mode start
`npm start`

- mode developpement avec nodemon :
`npm run dev`


*ADU* : A définir Ultérieurement
