const http = require('http')
const port = process.env.port || 3000
const birthdate = new Date('1999-11-10').toLocaleDateString();
http.createServer(function (request, response) {   
    response.end(birthdate);  
}).listen(port); 
 
