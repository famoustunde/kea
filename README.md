# KEA

Ce document présente le format MVC, main n'illustre aucun interface car nous concevons un API. Ainsi, les modules présentés sont: models and controllers. Routing: Express, ORM/Database : Sequelize, Authentication : Passport, JWT. Le but du JWT (Json Web Token) est de faciliter l'intégration avec des SPAs comme Angular 2+, React, etc, ainsi qu'avec des applications mobiles.

- Routing : Express
- ORM Database : Sequelize
- Authentication : Passport, JWT

## Installation
- Cloner le Repo avec `git clone https://github.com/famoustunde/kea.git`
- Installer les modules nodes avec `npm install`
- Créer un fichier `.env`. Un example est offert dans le dossier principal

## Structure
La structure est standard aux applications express.
- bin
- config
  - config.js
- controllers
  - candidat.controller.js
  - poste.controller.js
- middleware
  - custom.js
  - passport.js
- models
  - index.model.js
  - candidat.model.js
  - poste.model.js
- public
- routes
  - v1.js
- seeders
- services
- auth.service.js
- util.service.js
- .env

## Procédure

#### app.js
    - Charger les dependencies, et initialiser le serveur.
    - Connecter à la base des données et charger les modèles. La base de donnée est gérer avec MySQL, et deux tables (table poste et la table candidat) ont étées créé.
    - CORS — Pour que les sites web envoient des requêtes au serveur (Important)
    - app.use(cors());
    - Définir les routes
    - Définir un Promise Handler dans app.js
    - Service pour utilités — services/util.service.js
    - ReE, ReS — Méthode standard pour envoyer les réponses    

#### models/index.js
    - connection à to sequelize utilisant les variables env
    - Chargement des modèles
    - Exporter Sequelize
    - Modèle du Candidat
    - Importer le modèle du Candidat — models/candidat.model.js
    - Obtenir JSON Web Token(JWT) pour Authentification
    - Modèle du Poste  — models/poste.js

#### routes/v1.js
    - Routes pour les candidats

#### controllers/candidat.controller.js
    - Create: Créer une nouvelle entrée pour le candidat postulant
    - Get: Obtenir les informations sur un candidat
    - Update: Mettre à jour des informations autorisées d'un candidat
    - Remove: Supprimer la candidature d'un individu de la base des données.
    - Login: Cetter fonction retourne un token pour authentification.

#### controllers/poste.controller.js
    Les fonctionalités sont similaire au candidat, mais s'applique au poste dans ce contexte.
    - Create: Créer un nouveau poste
    - Get All: Retirer la liste des candidats ayant postuler à un poste donné
    - Get: Retirer les informations correspondants à un poste
    - Update: Mettre à jour les informations dans l'annonce d'un poste
    - Remove: Supprimer un poste de la base des données

### Testing
Afin de valider le présent système, charger le fichier `KEA TEST WEBSERVICE.postman_collection` et lancer le script.
    
## Présentation de la base des données

```
Candidat(
    candidatid: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    profession: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        unique : true,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
);
```
```
Poste (
    posteid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    libellé: {
        type: Sequelize.STRING
    },
    description: {
    type: Sequelize.STRING
    },
    experience: {
        type: Sequelize.INTEGER
    },
    datePublication: {
        type: Sequelize.DATE
    },
    dateExpiration: {
        type: Sequelize.DATE
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
);
```
