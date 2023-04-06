const http = require('http')
const hostname = process.env.hostname || '127.0.0.1'
const port = process.env.port || 3000
http.createServer(function (request, response) {   
    response.end('birthdate:10-11-1999');  
}).listen(port,hostname); 
 
