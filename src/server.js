'use strict'
require('dotenv').config()
const fs = require('fs')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const cookieParser = require('cookie-parser')

server.listen(4200, () => {
  console.log('listening on *:' + server.address().port)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/**
 * STATIC ROUTING PATHS
 */
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['css', 'js']
}))
app.use(express.static(path.join(__dirname, 'static'), {
  extensions: ['html', 'json', 'css', 'js']
}))
app.use(express.static(path.join(__dirname, 'test'), {
  extensions: ['js']
}))

/**
 * GET HOME PAGE
 */
app.get('/', (req, res) => {
  // res.sendFile('/index.html')
  res.render('pages/index')
})

io.on('connection', socket => {
  console.log('client connected')
  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
  socket.on('update nav', ({ dir }) => {
    socket.emit('status', {
      status: 'pending'
    })
    fs.readdir(path.join(__dirname, dir), (err, res) => {
      if (err) {
        socket.emit('error', {
          status: 'incomplete',
          error: err.message
        })
        return
      }
      res = res.filter(subDir => !(/(^|\/)\.[^.]/g).test(subDir))
      console.log(res)
      socket.emit('nav items', {
        navArr: res,
        status: 'complete'
      })
    })
  })
})

module.exports = app
