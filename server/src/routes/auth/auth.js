const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");

router.post("/register", auth.create);
router.post("/login", auth.login);

module.exports = router;
