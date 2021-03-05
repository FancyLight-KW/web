const express = require("express");
const router = express.Router();
const request = require("../controllers/Request/Requests.controller");

router.post("/newRequest/", request.create);
router.get("/getAllRequest/", request.findAll);
module.exports = router;
