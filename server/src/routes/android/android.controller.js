const models = require("../../DB/models");

exports.addDeviceID = (req, res) => {
  models.Devices.create({
    DEVICE_USER_ID: req.user.User_id,
    DEVICE_ID: req.body.DEVICE_ID,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
