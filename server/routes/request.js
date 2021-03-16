const express = require("express");
const router = express.Router();
const request = require("../controllers/Request/Requests.controller");
const path = require("path");
const multer = require("multer");
const moment = require("moment");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, moment.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/newRequest/", upload.single("imagefile"), request.create);
router.get("/getAllRequest/", request.findAll);
router.get("/getRequest/:userId", request.findOne);
router.put("/updateRequest/:requestId", request.update);
router.delete("/deleteRequest/:requestId", request.delete);

router.get("/searchRequest/:searchParam/:keyword", request.findRequest);
module.exports = router;
