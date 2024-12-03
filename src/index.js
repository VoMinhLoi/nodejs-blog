
// "start": "node --watch --inspect index.js",
// "start": "nodenom --inspect index.js",
const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
// app.use(morgan())
// app.use(morgan('combined'))

// Template engine
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'handlebars')//Thông báo với Express rằng mọi file template (view) sẽ có phần mở rộng .handlebars lúc res.render()
app.set('views', path.join(__dirname, 'resources/views'))

const route = require('./routes')
// Routes Init
route(app)

const port = 3000
app.listen(port, ()=>{console.log(`http://localhost:${port}`)})