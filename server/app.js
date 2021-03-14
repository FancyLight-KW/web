const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const models = require("./models/index.js");
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./controllers/Users/passport.js');

require("dotenv").config();
// const redis = require('redis'),
//   RedisStore = require('connect-redis')(session);
//var redisClient = redis.createClient(6379,'127.0.0.1');
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());
//세션 환경 세팅

app.use(session({
  saveUninitialized: false,
  resave: false,
  key: 'key',
  secret: 'secret',           //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
                              //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
  cookie: {
    maxAge: 1000 * 60 * 10 //유효시간 10분
  },
}));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig(passport);


const flash = require('connect-flash')
app.use(flash());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/requests", requestsRouter);

app.use("/upload", uploadRouter);

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
