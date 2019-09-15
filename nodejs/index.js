const express = require('express')
const app = express()
const PORT = 3000
app.use(async function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    //
    next();
  });
// midderware body-parser to Express
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const usersRouter = require('./routers/usersRouter')
app.use('/users',usersRouter)
//start server
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})