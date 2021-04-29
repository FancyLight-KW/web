const express = require("express");
const router = express.Router();
const request = require("./request.controller");
const upload = require("../middleware/fileupload");

// 요청/접수
// host/requests/

router.post("/", upload.single("imagefile"), request.create);
router.get("/", request.findRequest);
router.get("/image/:requestId", request.findImage);
router.get("/search", request.findRequest);
router.put("/:requestId", upload.single("imagefile"), request.update);
router.delete("/:requestId", request.delete);

module.exports = router;
