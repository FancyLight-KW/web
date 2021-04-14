const express = require("express");
const router = express.Router();
const android = require("./android.controller");

router.post("/", android.addDeviceID);

module.exports = router;
