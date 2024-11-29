// "start": "node --watch --inspect index.js",
// "start": "nodenom --inspect index.js",
const express = require('express')
const app = express()
app.get('/home',(request, response)=>response.send('Get all users'))
const port = 3000

app.listen(port, ()=>{console.log(`Example app listening http://localhost:${port}`)})