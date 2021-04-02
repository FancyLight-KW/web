const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

// session modules
const session = require('express-session');
const passport = require('passport');
const models = require("./models/index.js");
const passportConfig = require('./config/passport.config');

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const requestsRouter = require("./routes/request");
const uploadRouter = require("./routes/upload");
const app = express();

models.sequelize
  .sync()
  .then(() => {
    console.log("====DB 연결 성공======");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());
//세션 환경 세팅

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 10 //유효시간 10분
  },
}));
passportConfig(passport);
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

const flash = require('connect-flash')
app.use(flash());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);

app.use("/upload", uploadRouter);

//
app.use('/api/dialogflow', require('./routes/dialogflow'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
