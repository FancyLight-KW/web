const models = require("../../DB/models");
const FCM_Admin = require("firebase-admin");

exports.addDeviceID = (req, res) => {
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

exports.sendMessageToDevice = (req, res) => {
  models.Devices.findOne({
    where: {
      DEVICE_USER_ID: req.user.User_id,
    },
  })
    .then((result) => {
      const targetToken = result.DEVICE_ID;
      let msg = {
        notification: {
          title: "이동기 병신",
          body: "ㅋㅋㅋ",
        },
        data: {
          test: "안녕",
        },
        token: targetToken,
      };

      FCM_Admin.send(msg)
        .then((result) => {
          console.log(result);
          res.send("send success");
        })
        .catch((err) => {
          console.log(err);
          res.send("send fail");
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
