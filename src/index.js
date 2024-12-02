
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
app.get('/',(request, response)=>response.render('home'))
app.get('/news',(request, response)=>response.render('news'))
app.get('/search',(request, response)=>{
    response.render('search')
})

app.use(express.urlencoded({
    extended: true
})) // Middleware mã hóa dữ liệu từ form data client gửi lên và gán cho đối tượng request.body 
// app.use(express.json()) // JSON.parse() từ json sang javascript type khi dùng fetch,  
app.post('/search',(request, response)=>{
    console.log(request.body);
    // response.render('search')
})

const port = 3000
app.listen(port, ()=>{console.log(`http://localhost:${port}`)})