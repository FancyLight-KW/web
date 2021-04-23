const models = require("../../DB/models");
const FCM_Admin = require("firebase-admin");

exports.sendMessageToDevice = (agent_id, msg) => {
  models.Devices.findOne({
    where: {
      DEVICE_USER_ID: agent_id,
    },
  }).then((result) => {
    msg["token"] = result.DEVICE_ID;
    FCM_Admin.messaging().send(msg);
  });
  return 0;
};
