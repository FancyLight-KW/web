const models = require("../../DB/models");
const FCM_Admin = require("firebase-admin");

exports.sendMessageToDevice = (user, reqNo, msg) => {
  models.Devices.findOne({
    where: {
      DEVICE_USER_ID: user,
    },
  })
    .then((result) => {
      if (result) {
        msg["token"] = result.DEVICE_ID;
        models.Requests.findOne({
          where: {
            REQ_SEQ: reqNo,
          },
        }).then((result) => {
          msg.data.body = result.TITLE;
          FCM_Admin.messaging().send(msg);
        });

        console.log("메세지 전송 성공" + msg);

        return 0;
      }
    })
    .catch((err) => {
      console.log("err\n", err);
      return 1;
    });
  console.log("기기가 없음");
  return 2;
};
