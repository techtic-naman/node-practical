const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000
const userRoutes = require("./server/routes/userRoute");
const categoryRoutes = require("./server/routes/categoryRoute");
const productRoutes = require("./server/routes/ProductRoute");
const expressValidator = require('express-validator')
require('./server/config/db');
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator())
app.use('/images',express.static(path.join(__dirname, '/public/images')));
app.use('/api/v1/user',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)

app.get('/',(req,res)=>{
    res.send('check express')
})
app.listen(port,()=>{
    console.log(`we are listen server at ${port}`)
})


// const http = require('http')
// const port = process.env.port || 3000
// const birthdate = new Date('1999-11-10').toLocaleDateString();
// http.createServer(function (request, response) {   
//     response.end(birthdate);  
// }).listen(port); 
 
