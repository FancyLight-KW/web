process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == "production"
    ? "production"
    : "development";

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const models = require("./src/DB/models/index");
require("dotenv").config();

const app = express();
const indexRouter = require("./src/routes/index/index");
const mypageRouter = require("./src/routes/mypage/mypage");
const usersRouter = require("./src/routes/user/user");
const requestsRouter = require("./src/routes/request/request");
const agentRouter = require("./src/routes/agent/agent");
const adminRouter = require("./src/routes/admin/admin");
const authRouter = require("./src/routes/auth/auth");
const androidRouter = require("./src/routes/android/android");
const jwtAuth = require("./src/routes/middleware/jwt.auth");
const dialogflowRouter = require("./src/routes/chatbot/dialogflow");

models.sequelize
  .sync()
  .then(() => {
    console.log("====DB 연결 성공======");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

global.appRoot = path.resolve(__dirname);
// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// FCM 연결
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use(jwtAuth.authChecker);
app.use("/users", usersRouter);
app.use("/mypage", mypageRouter);
app.use("/requests", requestsRouter);
app.use("/agent", agentRouter);
app.use("/admin", adminRouter);
app.use("/android", androidRouter);
app.use("/dialogflow", dialogflowRouter);

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
