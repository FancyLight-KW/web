const express = require("express");
const user = require("../controllers/user.controller.js");
const router = express.Router();

//
// CREATE
//
// 새 유저 생성
router.post("/", user.create);

//
// READ
//

// 모든 유저 출력
router.get("/", user.findAll);

// ID를 인자로 받아 출력
router.get("/:userId", user.findOne);

//
// UPDATE
//
// 인덱스를 입력받아 수정
router.post("/:userId", user.update);

//
// DELETE
//
// 인덱스를 인자로 받아 삭제
router.delete("/:userId", user.delete);

module.exports = router;

// TODO
// db 유저정보 분리 (아이디, 비번 && 개인정보, )
// 요청데이터 테이블 생성
// api 만들기
