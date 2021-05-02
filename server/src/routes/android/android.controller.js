const models = require("../../DB/models");

exports.addDeviceID = (req, res) => {
  models.Devices.findOne({
    where: {
      DEVICE_USER_ID: req.user.User_id,
    },
  })
    .then((result) => {
      console.log(result);
      if (result) {
        models.Devices.destroy({
          where: {
            DEVICE_USER_ID: req.user.User_id,
          },
        });
      }
    })
    .catch((err) => {
      console.log("기기정보 검색 실패");
    });

  models.Devices.create({
    DEVICE_USER_ID: req.user.User_id,
    DEVICE_ID: req.body.DEVICE_ID,
  })
    .then((result) => {
      res.send({
        resultCode: 0,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        resultCode: 1,
      });
    });
};
