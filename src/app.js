const express = require("express");
const app = express();
const config = require("./config/config.js");

const handlebars = require("express-handlebars");
const path = require("path");
const productsRouter = require("./routes/products.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const sessionsRouter = require("./routes/sessions.routes");
const usersRouter = require("./routes/users.routes.js");
const viewRouter = require("./routes/views.routes.js");
const mocksRouter = require("./routes/mocks.routes.js"); // Actualización: usar mocks.router.js
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const inicializaPassport = require("./config/passport.config");
const { addLogger } = require("./utils/logger.js");
const cors = require("cors");
const logger = require("morgan");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/../public")));
app.use(cookieParser());
app.use(addLogger);
app.use(logger("dev"));

inicializaPassport();
app.use(passport.initialize());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: "./src/views/layouts",
    partialsDir: "./src/views/partials",
    defaultLayout: "main.handlebars",
    helpers: require("./utils/helpers.js"),
  })
);

app.set("views", path.join(__dirname + "/views"));

// Swagger Documentation
const specs = swaggerJSDoc(require('./utils/swaggerOptions.js'));
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Routes
app.use("/", viewRouter.getRouter());
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter());
app.use("/api/users", usersRouter.getRouter());
app.use("/api/mocks", mocksRouter.getRouter()); // Aquí conectamos la ruta de mocks

const serverExpress = app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}`)
);
const io = new Server(serverExpress);
require("./sockets/socket")(io);
