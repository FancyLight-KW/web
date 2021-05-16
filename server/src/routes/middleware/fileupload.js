const multer = require("multer");
var path = require("path");
const moment = require("../../config/moment.config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(appRoot, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, moment().format("YYYY-MM-DD_HH:mm:ss") + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
