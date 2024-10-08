

# Project: Idea-System-App

## Description

The project is a backend Rest-API for inserting / updating / Deleting ideas.
You must register and log in to use the service.

## Project components
- [Node js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Nest](https://github.com/nestjs/nest) framework TypeScript.
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/) runs in a Docker container for database usage.

## Installation guide

1. Install [MongoDB](https://www.mongodb.com/) (via your machine or via MongoDb atlas [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) [The [Docker](https://www.docker.com/) installation below])
2. Install both [Npm](https://www.npmjs.com/) and [Node.js](https://nodejs.org/en/download/prebuilt-binaries) on your machine
3. Install the `idea-system-app` Rest-API application. 

## Installation

To install [MongoDB](https://www.mongodb.com/) on your machine:

- Install MongoDB on [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- Install MongoDB on [Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
- Install MongoDB on [Mac](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

To install the application, please run:

- On your machine, go to your projects path, and create new folder with the project name: `idea-system-app`
- Go (```cd /~path/projects/project-name/```) to your project folder path 
- Clone the application `idea-system-app` from [github](https://github.com/ehud91/idea-system.git) to your machine
- Go to (`cd /folder-name`) to the project `idea-system-app`

```bash
$ npm install
```

## Running the app on desktop

To run the application, please execute:

```bash
# development mode:
$ npm run start

# watch mode:
$ npm run start:dev

# production mode:
$ npm run start:prod
```

## Test

To run the unit tests, please execute:

```bash
# run the unit tests:
$ npm run test
```

## Run on docker

To run the project in a Docker container:

- Build the MongoDB docker image:

```bash
docker pull mongodb/mongodb-community-server:latest
```

- Run the MongoDB docker container:

```bash
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

- Verify that the MongoDB container is running:

```bash
docker ps
```

- Connect to MongoDB via [mongosh](https://www.mongodb.com/docs/mongodb-shell/install/#supported-mongodb-versions):

```bash
mongosh --port 27017
```

- Build the docker image:

```bash
docker build -t idea-system .
```

- Run the docker container:

```bash
docker run -p 3000:3000 idea-system
```

- Verify that the application is running:

  Open your web browser or use like `curl` to verify that the application is runnin correctly:

```bash
http://localhost:3000/
```

- Go play with the Swagger API via browser: 


```bash
http://localhost:3000/api-info/
```



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Nest Js is a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

