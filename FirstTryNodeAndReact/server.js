const http = require('http');
const port = process.env.PORT || 1337;

var controller = require('./JS/Controller.js');

http.createServer(controller.handleRequest).listen(port);