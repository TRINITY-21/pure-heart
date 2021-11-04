const http = require('http');
const express = require('express')
const usersRoutes = require('./routes/users')
const shopRoutes = require('./routes/home')
const rootDir = require('./util/path')
const bodyParser = require('body-parser');
const path = require('path');

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use(usersRoutes)

app.use(shopRoutes)

app.use((req,res)=>{
    
    res.sendFile(path.join(rootDir, './','views','404.html'))
})


const server = http.createServer(app);

server.listen(2000);
