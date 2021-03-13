const express = require("express");
const router = express.Router();
const user = require("../controllers/Users/Users.controller");
const login = require("../controllers/Users/Users.login.controller");
const index = require("../controllers/index/index.controller");

router.post("/register", user.create);
router.post("/login", login.login);
router.get("/logout", login.logout);

// 여기에 쿠키, 세션정보 확인 해야할 듯
router.get("/", index.countCSR_STATUS);

module.exports = router;
