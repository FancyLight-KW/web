const express = require("express");
const router = express.Router();
const mypage = require("./mypage.controller");

router.get("/", mypage.myInProgressRequest);
router.get("/done", mypage.myInProgressRequest);

module.exports = router;
