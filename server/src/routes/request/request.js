const express = require("express");
const router = express.Router();
const request = require("./request.controller");
const upload = require("../middleware/fileupload");

// host/requests/

router.post("/", upload.single("imagefile"), request.create);
router.get("/", request.findAll);
router.get("/count", request.findRequestCount);
router.get("/search", request.findRequest);
router.put("/:requestId", upload.single("imagefile"), request.update);
router.delete("/:requestId", request.delete);
module.exports = router;
