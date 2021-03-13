const express = require("express");
const router = express.Router();
const user = require("../controllers/Users/Users.controller");
const login = require("../controllers/Users/Users.login.controller");
//const passport = require("../controllers/Users/passport.js");
const passport = require('passport');
//passport 세팅
// const passport = require("passport"),
//   LocalSrategy = require("passport-local").Strategy;
// router.use(passport.initialize());
// router.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
// passport.use(new LocalSrategy({
//   usernameField: 'User_id',
//   passwordField: 'User_password'
// }, login.login))

//라우팅
router.post("/register", user.create);
//router.post("/login", login.login);
router.get("/logout", login.logout);
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) =>{
  res.redirect('/login');
}
);
/* GET home page. */
// 여기에 쿠키, 세션정보 확인 해야할 듯
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
