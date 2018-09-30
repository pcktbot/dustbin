# Models are for Databases

Not sure why this is the convension, but scripting for working with databases live in the `models/` directory. 

## Models are for defining tables and views, their schema or lack-of

There is also some client configuration here, like which one to use with what variables (coming from .env). The sending and receiving are managed by the client itself, which lives closer to the server. 

The model inspects the current state of the database, what tables, what's changed, and does the schema need to be updated, and adds that all as properties to a database object which the client can use.

## One Model to One File

In addition to the `index.js` file, there are files for every table or view in your database, which includes the schema for structuring the data stored there. Start with this

``` js
require('dotenv').config()
// dotenv adds variables from local .env files to the process.env
const fs = require('fs')
const path = require('path')
const pg = require('pg')

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432
}
// this is straight from the pg documentation

let db = {}
db.config = config
// add the config object as a property of db, a larger object

module.exports = db
// then ship it off 
```
These process variables can be passed as arguments when invoking `node ...` to run the app, either in the CLI, or as a npm script in the package.json. Ex.

``` json
...
"scripts": {
  "start": "DB_USER='somesuch' \
    DB_HOST='... etc' node server.js",
},
...
```
I started using 'dot-env' because of a recommendation, and it has been unintrusive. Store a list of variables in the ALL_CAPS_SYNTAX convension of environment variables in a `.env` file at the root of your project. 

!> Don't commit this file. 

In the .gitignore file, add the entry
``` bash
*.env
...
```

[node-postgres reference](https://node-postgres.com/features/connecting)

Let's expand on that.

The Index file uses the `fs` Node module for interacitng with those files. 
Since we're using Webpack, let's make sure any exported models are available to the server, so in your `src/server.js` or `main.js` or `src/index.js` or whatever, add the lines

``` js
// where the major dependencies live
const { Pool, Client } = require('pg') // or sequelize
require('../models')
// assuming posix syntax
const client = new Client(db.config)
// instantiate those classes using the config from my models module.

client.connect()
```

## Clients are used by the Server to help with the IO

So they live in the server script and are included with the `{ app, server }` module exports.

