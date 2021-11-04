const http = require('http');
const express = require('express')
const routes = require('./routes');

const app = express()

app.use('/users', (req,res,next)=>{
    
    console.log("Log something to console again")

    return res.send('<h2>Return Some Dummy data!</h2>')

})


app.use('/', (req,res,next)=>{

    console.log("Log something to console")

    return res.send('<h2>Welcome to this Express page, happy surfing!</h2>')


})





const server = http.createServer(app);

server.listen(2000);
