const models = require("../../DB/models");

exports.addDeviceID = (req, res) => {
  let body = req.body;
  models.Devices.create({
    DEVICE_USER_ID: body.DEVICE_USER_ID,
    DEVICE_ID: body.DEVICE_ID,
  }).then((result) => {
    res.send("add good");
  });
};
