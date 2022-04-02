# API ROF

  

## Objectif

  

L'objectif est d'exposer le *référentiel des opérateurs* funéraires sous forme d'API. Les données sont cette fois ci exposées dans une base de donnée MongoDB.

  
>**NOTE** : 
Pour ce cas Mongo Atlas est utilisé sans les spécificités de recherche floue offertes par cette solution.

  
L'API permet d'effectuer des recherches par :

|*Critères*|
|---|
|identifiant technique|
|code postal|
|code departement|
|raison sociale|
|nom commercial|
|activite, prestations|
|coordonnées geographiques et distances kilométriques|

  

Cette API dépend du chargement des données effectuées depuis le projet [rof-load-bd](https://github.com/mogador26/rof-load-bd.git?branch=master).

  
### évolutions à prévoir

  - *fonctionnelle*
    - [x] : ajout du numéro de siret :soon:

  - *technique*
    - [x] : modification du body pour la ressource geo (données opérateurs et coordonnées géographiques + distance kms)
    - [x] : ajout du contrôle du body avec le body-parser
    - [x] : traitement des secrets d'accès à la base de données
    - [x] : déploiement automatisé

 

## Pré-requis

  

**node** : v14

  

## Installation

  

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
  

## Environnement


### node.js (solo)

- variables :

|Type|Nom|Valeur|
|---|---|---|
|API|PORT|**_port d'écoute node.js_** |
|API|WINDOW_TIME|**_WINDOW_TIME : 15 * 60 * 1000 # en ms (ici 15 minutes)_**|
|API|MAX_REQUEST_BY_IP|**_nombre de requetes dans une fenêtre de 15 minutes_** |
|API|LIMIT_SEARCH|**_limite du nombre d'enregistrement autorisé pour une recherche_** |
|API|URL_DB|**_url de connexion à mongodb_** |

- mode start

```sh
npm start
```

- mode developpement avec nodemon :

```sh
npm run dev
```

### Heroku

- Un fichier *Procfile* est défini pour une utilisation dans un environnement Heroku :

  -  ``web: npm start``


### Docker

  
#### Variables


|Type  |Nom  |Valeur  |
|--|--|--|
|Mongo|MONGO_INITDB_ROOT_USERNAME|**utilisateur admin** |
|Mongo|MONGO_INITDB_ROOT_PASSWORD|**mot de passe admin** |
|Mongo|MONGO_INITDB_DATABASE|**database** |
|Mongo|MONGO_USERNAME_DB|**utilisateur db** |
|Mongo|MONGO_PASSWORD_DB|**mot de passe db** |
|Mongo|MONGO_DOCKER_PORT|**port docker pour le service mongo** |
|Mongo|MONGO_LOCAL_PORT|**port local docker pour le service mongo** |
|API|PORT|**port d'écoute nodejs** |
|API|WINDOW_TIME|**_window_time_ : 15 * 60 * 1000 # en ms (ici 15 minutes)**|
|API|MAX_REQUEST_BY_IP|**nombre de requetes dans une fenêtre de 15 minutes** |
|API|LIMIT_SEARCH|**limite du nombre d'enregistrement autorisé pour une recherche** |
|API|URL_DB|**url de connexion à mongodb** |
|API|API_DOCKER_PORT|**port docker pour le service app rof** |
|API|API_LOCAL_PORT<sup>1</sup>|**port local docker** |
  
<sup>[1]</sup> : uniquement pour *docker-compose*

> *Note*: Les variables Mongo ne sont utilisées que dans le cadre de *docker-compose*.

- Un fichier *Dockerfile* est également défini afin d'exécuter node.js dans un environnement de conteneur.

  - création de l'image docker
    ```sh
    docker build . -f ./Dockerfile  -t <youruser>/api-rof:1.0
    ```

- Un fichier *docker-compose.yml* intégre :

  - [x] : mongo v4
  - [x] : node.js

   - sans build image *api-rof* :   
     - start
         ```sh
         docker-compose -f ./docker-compose.yml up
         ```
     - stop
       ```sh
       docker-compose -f ./docker-compose.yml down
       ```    
   - avec build image *api-rof*
     - build
       ```sh
       docker-compose -f ./docker-compose-with-build-api.yml build
       ```
     - start
       ```sh
       docker-compose -f ./docker-compose-with-build-api.yml up
       ```
     - stop
       ```sh
       docker-compose -f ./docker-compose-with-build-api.yml down
       ```

## Tests

### Tests de charge

[loadTest](https://github.com/mogador26/rof-api-bd/blob/master/.github/workflows/loadTest.yml)

Les tests de charge sont réalisés avec [artillery](https://www.artillery.io/) et [github actions](https://www.artillery.io/docs/guides/integration-guides/github-actions).

Les scénarios sont décrits sous le répertoire./test et les données sont identifiées dans le fichier [keywords](./test/keywords_rof.csv).

La forme du fichier est :
|code_departement|code_postal|prestations|critères|sort|desc|limit|
|----------------|-----------|-----------|-----------------------|---|-----|-----|
|*le code departement*|*le code postal*|*le type de prestations*|*critères de recherches pour search?q=*|*tri*|*ordre du tri*|*limit du nombre d'éléments renvoyés*|

- Exemples
  
|code_departement|code_postal|prestations|critères|sort|desc|limit|
|----------------|-----------|-----------|-----------------------|---|-----|-----|
|78|78000|Organisation des obsèques||raison_sociale||5
|75|75000|Soins de conservation||raison_sociale||10
|35|32000|Soins de conservation||raison_sociale||5



## Présentations

- Ajout de slides conçus avec [slides.com](https://slides.com/) / [reveal.js](https://revealjs.com/) qui présentent quelques fonctionnalités de l'API (./html/)
