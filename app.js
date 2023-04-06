const http = require('http')
const port = process.env.port || 3000
http.createServer(function (request, response) {   
    response.end('birthdate:10-11-1999');  
}).listen(port); 
 
