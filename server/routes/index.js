const express = require("express");
const router = express.Router();
const index = require("../controllers/index/index.controller");
router.get("/csrstatus", index.countCSR_STATUS);
module.exports = router;
