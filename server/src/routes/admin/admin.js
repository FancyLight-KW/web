const express = require("express");
const router = express.Router();
const admin = require("./admin.controller");

// host/api/admin

// 진행중인 요청
router.use((req, res, next) => {
  if (req.user.User_position < 3) {
    res.status(401).send({
      message: "접근 권한이 없습니다.",
    });
  } else {
    next();
  }
});

router.get("/", admin.receiptRequest);
router.put("/", admin.allocateAgent);
router.put("/deny", admin.denyRequest);
router.get("/agentlist", admin.searchAgent);

module.exports = router;
