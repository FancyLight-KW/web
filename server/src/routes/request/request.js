const express = require("express");
const router = express.Router();
const request = require("./request.submit.controller");
const mypage = require("./request.my.controller");
const upload = require("../middleware/fileupload");

// 요청/접수
// host/requests/

router.post("/", upload.single("imagefile"), request.create);
router.get("/", request.findAll);
router.get("/count", request.findRequestCount);
router.get("/search", request.findRequest);
router.put("/:requestId", upload.single("imagefile"), request.update);
router.delete("/:requestId", request.delete);

// 내 요청 목록

router.get("/mypage", mypage.myInProgressRequest);
router.get("/mypage/done", mypage.myInProgressRequest);

module.exports = router;
