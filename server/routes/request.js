const express = require("express");
const router = express.Router();
const request = require("../controllers/Request/Requests.controller");
const upload = require("../config/fileupload");

router.post(
  "/newRequest",
  (req, res, next) => {
    console.log(JSON.stringify(req));
    upload.single("imagefile");
    next();
  },
  request.create
);
router.get("/getAllRequest", request.findAll);
router.get("/searchRequest", request.findRequest);
router.put("/updateRequest/:requestId", request.update);
router.delete("/deleteRequest/:requestId", request.delete);
module.exports = router;
