require('dotenv').config()
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
const client = new pg.Client(config)
// using methods and callbacks
client.connect()
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err.stack)
  } else {
    console.log(res)
  }
})
client.end(err => {
  if (err) {
    console.log('error on exit.')
  } else {
    console.log('disconnected successfully.')
  }
})

let db = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(file => {
    // let model = sequelize.import(path.join(__dirname, file))
    // db[model.name] = model
    // need to rewrite for pg
    console.log(file)
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// stash the config in the db export
db.config = config
db.client = client

module.exports = { db } 