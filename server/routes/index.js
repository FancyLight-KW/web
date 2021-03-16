const express = require("express");
const router = express.Router();
const user = require("../controllers/Users/Users.controller");
const login = require("../controllers/Users/Users.login.controller");
const passport = require('passport');
const index = require("../controllers/index/index.controller");

//라우팅
router.post("/register", user.create);
router.get("/logout", login.logout);

// router.get("/login", (req, res) => {
//   res.render('login');
// })

router.post('/login/done',(req, res, next) => {
  if(req.isAuthenticated()){
    console.log("Already logined")
  }
  else{
    console.log("new login!");
    passport.authenticate('local',{
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      })(req, res, next);
  }
});

// router.post('/login', passport.authenticate('local',{
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true,
//   }),
//   (req, res) => {
//   console.log("req.user : "+ JSON.stringify(req.session.passport));
//   res.send({
//     user: req.session.passport
//   });
// });
/* GET home page. */
// 여기에 쿠키, 세션정보 확인 해야할 듯
router.get("/", (req, res) => {
  console.log(JSON.stringify(req.cookies))
  if(req.isAuthenticated()){
    res.send({
      session: req.session
    });
  }
  else{
    res.send({
      message: "main"
    });
  }
});


module.exports = router;
