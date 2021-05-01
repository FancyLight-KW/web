const models = require("../../DB/models");
const FCM_Admin = require("firebase-admin");

exports.sendMessageToDevice = async (agent, reqNo) => {
  let msg = {
    android: {
      notification: {
        click_action: ".HomeActivity",
      },
    },
    notification: {
      title: "새로운 요청이 들어왔어요",
      body: "헤헤",
    },
    data: {
      test: "안녕",
    },
  };

  await models.Devices.findOne({
    where: {
      DEVICE_USER_ID: agent,
    },
  }).then((result) => {
    msg["token"] = result.DEVICE_ID;
  });

  // await models.Requests.findOne({
  //   where: {
  //     REQ_SEQ: reqNo,
  //   },
  // }).then((result) => {
  //   msg["data"] = {
  //     title: result.TITLE,
  //     body: result.CONTENT,
  //   };
  // });

  console.log(msg);
  await FCM_Admin.messaging().send(msg);

  return 0;
};
