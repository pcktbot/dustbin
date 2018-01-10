var http = require("http");
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.end('Success\n');
}).listen(3456);
console.log('Serving at http://localhost:3456/')
