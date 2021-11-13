const http = require('http');
const express = require('express')
const routes = require('./routes');
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path')
const bodyParser = require('body-parser');
const path = require('path');

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin', adminData.products)

app.use(shopRoutes)

app.use((req,res)=>{
    
    res.sendFile(path.join(rootDir, './','views','404.html'))
})


const server = http.createServer(app);

server.listen(2000);
