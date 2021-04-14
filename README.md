### API ROF

## Objectif

L'objectif est d'exposer le *référentiel des opérateurs* funéraires sous forme d'API. Les données sont cette fois ci exposées dans une base de donnée MongoDB.

Pour ce cas Mongo Atlas est utilisé sans les spécificités de recherche floue offertes par cette solution.

L'API permet d'effectuer des recherches par :

  - identifiant technique,
  - code postal, code departement,
  - raison sociale, nom commercial, ville,
  - activite, prestations,
  - coordonnées geographiques et distances kilométriques

Cette API dépend du chargement des données effectuées depuis le projet [rof-load-bd](https://github.com/mogador26/rof-load-bd.git).

*Quelques évolutions fonctionnelles et techniques à prévoir* :

fonctionnel :
  - ajout du numéro de siret
  - modification du body pour la ressource geo (données opérateurs et coordonnées géographiques + distance kms)
  
technique :
  - ajout du contrôle du body avec le body-parser
  - traitement des secrets d'accès à la base de données
  - deploiement automatisé

# Pré-requis

**node** : v14

# Installation

`git clone https://github.com/mogador26/rof-api-bd.git`

- debuggage en mode dev
`npm install --save-dev nodemon`

- installation des packages
`npm install`

  - **morgan** : traitement des logs
  - **serve-favicon**
  - **express-rate-limit** : limite d'accès par IP
  - **dotenv** : chargement des variables d'environnement
  - **swagger-ui-express** : chargement du swagger
  - **yamljs** : prise en compte du format yaml pour le swagger
  - **mongoose** : accès à une base de données mongodb
  - **express-healthcheck** : état de l'api.

# Environnement

- Un fichier *Procfile* est défini pour une utilisation dans un environnement Heroku :
  - ``web: npm start``
- Un fichier *Dockerfile* est également défini afin d'exécuter node.js dans un environnement de conteneur.

# Exécution

- mode start
`npm start`

- mode developpement avec nodemon :
`npm run dev`


## Présentations
- Ajout de slides conçus avec [slides.com](https://slides.com/) / [reveal.js](https://revealjs.com/) qui présentent quelques fonctionnalités de l'API (./html/)
