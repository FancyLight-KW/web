const express = require("express");
const router = express.Router();
const user = require("../controllers/Users/Users.controller");
const login = require("../controllers/Users/Users.login.controller");

router.post("/register", user.create);
router.post("/login", login.login);
router.get("/logout", login.logout);

/* GET home page. */
// 여기에 쿠키, 세션정보 확인 해야할 듯
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
