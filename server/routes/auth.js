const express = require("express");
const router = express.Router();
const user = require("../controllers/Users/Users.controller");
const login = require("../controllers/Auth/Auth.controller");

router.post("/register", user.create);
router.post("/login", login.login);

module.exports = router;
