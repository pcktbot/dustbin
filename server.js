'use strict';
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const sslOpts = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};
const server = require('https').createServer(sslOpts, app);
const io = require('socket.io')(server);
const path = require('path');
const Push = require('push.js');
const reloadify = require('reloadify');
const sendevent = require('sendevent');
const watch = require('watch');

const ejs = require('ejs');

server.listen(4200, () => {
  console.log('listening on *:' + server.address().port);
});

// reloadify(app, __dirname + '/static');
// reloadify(app, __dirname + '/public');
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url); 
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname,'/static'), {
  extensions: ['html', 'htm', 'json']
}));


app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

io.on('connection', socket => {
  console.log('client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
  socket.on('update nav', ({dir}) => {
    socket.emit('status', {
      status: 'pending'
    });
    fs.readdir(__dirname + dir, (err,res) => {
      if (err) { 
        socket.emit('error', {
          status: 'incomplete',
          error: err.message
        }); 
        return;
      }
      res = res.filter(subDir => !(/(^|\/)\.[^\/\/.]/g).test(subDir));
      socket.emit('nav items', {
        navArr: res,
        status: 'complete'
      });
    });
  });
});






module.exports = app;