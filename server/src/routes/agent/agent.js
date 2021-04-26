const express = require("express");
const router = express.Router();
const agent = require("./agent.controller");

// host/agent/
router.use((req, res, next) => {
  if (req.user.User_position < 2) {
    res.status(401).send({
      message: "접근 권한이 없습니다.",
    });
  } else {
    next();
  }
});
router.get("/list", agent.findAllAgent);
router.get("/", agent.findAllUSerDisposeRequest);

module.exports = router;
