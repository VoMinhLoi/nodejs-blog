// "start": "node --watch --inspect index.js",
// "start": "nodenom --inspect index.js",
const express = require("express");
// const morgan = require("morgan");
const app = express();
const path = require("path");

// connect DB
const db = require('./config/db')
db.connect()

app.use(express.static(path.join(__dirname, "public")));

// Phân tích xong gán cho đối tượng request.body
app.use(express.urlencoded({
  extended: true
}));
// app.use(express.json());

// HTTP logger
// app.use(morgan())
// app.use(morgan('combined'))

// Template engine
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "hbs",
    helpers: {
      sum: (a, b) => a + b,
  },
  })
);
app.set("view engine", "handlebars"); //Thông báo với Express rằng mọi file template (view) sẽ có phần mở rộng .handlebars lúc res.render()
app.set("views", path.join(__dirname, "resources", "views"));

const route = require("./routes");
// Routes Init
route(app);

const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
