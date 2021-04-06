const express = require("express");
const router = express.Router();
const index = require("./index.controller");
router.get("/csrstatus", index.countCSR_STATUS);
module.exports = router;
