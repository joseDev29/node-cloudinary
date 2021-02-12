const express = require("express");
const morgan = require("morgan");
const path = require("path");
const express_handlebars = require("express-handlebars");
const { server } = require("./config");

//App configuration
const app = express();
require("./db/mongodb");
app.set("port", server.port || 3001);

//View Engine Configuration
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.set("views", path.join(__dirname, "./views"));
app.engine(
  ".hbs",
  express_handlebars({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", ".hbs");

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false, //Evita que lea los archivos complejos como, imagenes, ya que de eso se encarga multer
  })
); //Permite leer los datos que vienen de un form
app.use(require("./middleware/multer"));

//Router
app.use(require("./routes"));

module.exports = app;
