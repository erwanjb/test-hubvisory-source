## Description

Test pour Hubvisory Source
But : Réaliser un Quizz cinématographique en accord avec les spécifications techniques.
Voir le board du Quizz [ICI](https://github.com/erwanjb/test-hubvisory-source/projects/1)

## Choix des technos

- Front :  React js
Pourquoi ? framework js front très rapide et réactif avec une grosse communauté

- Back : Nest js
Pourquoi ? framework Node js back qui permet d'avoir une architecture cohérente et modulable et s'interface avec des ORM facilement  

- Base de donnée : Postgresql (pour stocker le user)

## Minimale Node version

- v12.13.0

## Variables d'environnement


mettre dans un .env à la racine du projet

```bash
NODE_ENV=  development or production
DB_PORT=    port db (5432 en général)
DB_HOST=      host db (localhost en dev)
DB_USERNAME=       user db (souvent postgres)
DB_PASSWORD=root    db password
DB_NAME=hub         nom de la base de donnée
JWT_SECRET=      secret pour jwt  
SESSION_SECRET=    secret pour session
PASSWORD_SALT=      salt bcrypt (10 par ex)
THEMOVIEDB_API_KEY=       key app de themoviedb
EMAIL=       email d'un user (pour les tests)
PASSWORD=     passord d'un user (pour les tests)
```

## Installation

```bash
$ npm install
```

## Building the app

```bash
$ npm run build
```

## Running the app

```bash
$ npm run start
```

## Building and Running the app

```bash
$ npm run full
```

## Test

```bash
# e2e tests (il faut avoir créé un user, mettre ses identifiants dans le .env et lancer l'application avec npm run start / full)
$ npm run test-e2e
```