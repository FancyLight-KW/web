const express = require("express");
const router = express.Router();
const upload = require("../config/fileupload");

router.get("/", (req, res) => {
  res.render("upload");
});
router.post("/", upload.single("imagefile"), (req, res, next) => {
  if (req.file) {
    res.send("uploaded: " + req.file.path);
  } else {
    res.send("file no!");
  }
});

module.exports = router;
