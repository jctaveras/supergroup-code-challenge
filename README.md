# SuperGroup Code Challenge - Monorepo

This code challenge results in an application powered by GraphQL + Apollo Server + React

## Requirements

- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/)

  **Note:** If you are using [Docker for Mac](https://docs.docker.com/desktop/mac/install/) then `docker-compose` is already available.

## Launching the Server

If your goal is just to run the [server](./server/) execute the following command in your terminal:

```bash
yarn --cwd server dev && docker exec -d server yarn migrate:deploy
```

This will spin a graphql playground at [localhost:8080](http://localhost:8080) from which you'll be able to run queries.

## Launching the Client

If you'd like to run the [client](./client/) execute the following command in your terminal:

```bash
yarn --cwd client && yarn --cwd client start
```

This will install the dependencies and start the application in the [localhost:3000](http://localhost:3000)

## Launching everything at once

Running everthing at once it is just as simple as typing the following command in your terminal:

```bash
yarn start
```

From this both the client and the Graphql playground will be available at [localhost:3000](http://localhost:3000) and [localhost:8080](http://localhost:8080) respectively

Once you are done running the project just `ctrl + c` and run:

```bash
yarn stop
```

This will destroy de current instance of the database so this will result in data loss.

## Features

- Display a list of links ✅
- Search the list of links ✅
- User can create new links ✅
- Realtime update when a new links are created ❌
