const express = require("express");
const router = express.Router();
const request = require("../controllers/Request/Requests.controller");
const upload = require("./middleware/fileupload");
const auth = require("./middleware/jwt.auth");

router.post("/newRequest", upload.single("imagefile"), request.create);
router.get("/getAllRequest", auth.authChecker, request.findAll);
router.get("/count", request.findRequestCount);
router.get("/searchRequest", request.findRequest);
router.put("/updateRequest/:requestId", request.update);
router.delete("/deleteRequest/:requestId", request.delete);
module.exports = router;
