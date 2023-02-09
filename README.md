## DevOps Live Coding Challenge

This comes with two components:

- Web API (Node v18)
- DB (PostgreSQL v15)

## Requirements

- Docker
- Node v18

## Web API (Node v18)

The Web API is a mostly plain Node and consists of the following:

* `index.js` starts a Node server, and maps requests to handlers
* `handlers.js` has business logic
* `test.js` has tests written with `jest`

The dependencies are managed with `npm`.

See `package.json` to learn how to run start and test API.

### DB (PostgreSQL v15)

It has just two tables - `users` and `tweets`.
See `db/init.sql` to learn the schema. It's quite simple.

## Spin up

Run `docker compose up --build` at the root directory.

## Troubleshooting

### The init scripts for DB in `./db` don't run

Remove the container with `docker rm [Container ID]`.
The scripts in `docker-entrypoint-initdb.d` run once.
