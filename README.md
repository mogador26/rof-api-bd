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

  
#### évolutions à prévoir

  - *fonctionnelle*
    - [x] : ajout du numéro de siret

  - *technique*
    - [x] : modification du body pour la ressource geo (données opérateurs et coordonnées géographiques + distance kms)
    - [x] : ajout du contrôle du body avec le body-parser
    - [x] : traitement des secrets d'accès à la base de données
    - [x] : déploiement automatisé

 

# Pré-requis

  

**node** : v14

  

# Installation

  

`git clone https://github.com/mogador26/rof-api-bd.git`

  

- debuggage en mode dev

`npm install --save-dev nodemon`

  

- installation des packages

`npm install`

  

-  **morgan** : traitement des logs

-  **serve-favicon**

-  **express-rate-limit** : limite d'accès par IP

-  **dotenv** : chargement des variables d'environnement

-  **swagger-ui-express** : chargement du swagger

-  **yamljs** : prise en compte du format yaml pour le swagger

-  **mongoose** : accès à une base de données mongodb

-  **express-healthcheck** : état de l'api.

  

# Environnement

  

## node.js (solo)


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

## Heroku

- Un fichier *Procfile* est défini pour une utilisation dans un environnement Heroku :

  -  ``web: npm start``


## Docker

  

### Variables

  

|Type  |Nom  |Valeur  |
|--|--|--|
|Mongo|MONGO_INITDB_ROOT_USERNAME|**_user admin_** |
|Mongo|MONGO_INITDB_ROOT_PASSWORD|**_password admin_** |
|Mongo|MONGO_INITDB_DATABASE|**_database_** |
|Mongo|MONGO_USERNAME_DB|**_user db_** |
|Mongo|MONGO_PASSWORD_DB|**_password db_** |
|Mongo|MONGO_DOCKER_PORT|**_port docker pour le service mongo_** |
|Mongo|MONGO_LOCAL_PORT|**_port local docker pour le service mongo_** |
|API|PORT|**_port d'écoute nodejs_** |
|API|WINDOW_TIME|**_WINDOW_TIME : 15 * 60 * 1000 # en ms (ici 15 minutes)_**|
|API|MAX_REQUEST_BY_IP|**_nombre de requetes dans une fenêtre de 15 minutes_** |
|API|LIMIT_SEARCH|**_limite du nombre d'enregistrement autorisé pour une recherche_** |
|API|URL_DB|**_url de connexion à mongodb_** |
|API|API_DOCKER_PORT|**_port docker pour le service app rof_** |
|API|API_LOCAL_PORT<sup>1</sup>|**_port local docker_** |
  
[1] : uniquement pour *docker-compose*

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
      - start
        ```sh
        docker-compose -f ./docker-compose-with-build-api.yml up
        ```
      - stop
        ```sh
        docker-compose -f ./docker-compose-with-build-api.yml down
        ```
 
  
  

## Présentations

- Ajout de slides conçus avec [slides.com](https://slides.com/) / [reveal.js](https://revealjs.com/) qui présentent quelques fonctionnalités de l'API (./html/)
