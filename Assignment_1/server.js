const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes.handler);

console.log("Server connected", server.listen(2000));
