 ### API ROF

## Objectif

L'objectif est d'exposer le référentiel ROF sous forme d'API. Il s'agit dans notre contexte d'effectuer :

- Data Prep
  - prise en compte du référentiel des opérateurs funéraires sous forme JSON
  - ADU : 
    - adresses géocodées
    - ajout du numéro de siret
    - ajout des libellés des prestations 
    - Chargement des données
      - Il s'agit actuellement d'un simple fichier. Compte tenu de la taille du référentiel ce n'est pas trés contraignant. On pourrait imaginer une exposition sous mongodb pour une recherche textuelle plus aboutie

# Installation

`git clone https://github.com/mogador26/rof.git`

- debuggage en mode dev
`npm install nodemon --save-dev -g`

- installation des packages
`npm install`

  - morgan
  - serve-favicon
  - express-rate-limit
  - dotenv 


# Exécution

- mode start
`npm start`

- mode developpement avec nodemon :
`npm run dev`


*ADU* : A définir Ultérieurement