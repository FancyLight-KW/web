const express = require("express");
const router = express.Router();
var path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("upload");
});
router.post("/", upload.single("imagefile"), (req, res) => {
  if (req.file) {
    res.send("uploaded: " + req.file.path);
  } else {
    res.send("file no!");
  }
});
module.exports = router;
