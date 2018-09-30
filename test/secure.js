// const sslOpts = {
//   key: fs.readFileSync('./server.key'),
//   cert: fs.readFileSync('./server.crt')
// };
// const server = require('https').createServer(sslOpts, app);

// const Push = require('push.js');
// const reloadify = require('reloadify');
// const sendevent = require('sendevent');
// const watch = require('watch');

// reloadify(app, __dirname + '/static');
// reloadify(app, __dirname + '/public');

// app.use((req, res, next) => {
//   if (req.secure) {
//     next();
//   } else {
//     res.redirect('https://' + req.headers.host + req.url); 
//   }
// });

// app.use((req, res, next) => {
//   res.status(404).send("Sorry, can't find that!");
// });
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).send("Something's broken!");
// });