const express = require("express");
const user = require("./Users.controller.js");
const router = express.Router();

// 모든 유저 출력
router.get("/list", user.userList);
// ID를 인자로 받아 출력
router.get("/:userId", user.findOne);
// 인덱스를 입력받아 수정
router.put("/:userId", user.update);
// 인덱스를 인자로 받아 삭제
router.delete("/:userId", user.delete);

module.exports = router;
