const models = require("../../DB/models");
const { Op } = require("sequelize");
const sendMsg = require("../android/sendMsg");

//요원에게 할당된 요청
exports.findAllUSerDisposeRequest = (req, res) => {
  models.Requests.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: models.Users,
        as: "REG_USER",
        attributes: ["User_name"],
      },
    ],
    where: {
      MOD_USER_ID: req.user.User_id,
      CSR_STATUS: {
        [Op.or]: ["접수완료", "요청처리중"],
      },
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        resultCode: 1,
        message: "find error",
      });
    });
};

//요청 수정
exports.updateRequest = (req, res) => {
  let body = req.body;
  let params = req.params;

  if (params.isfinished != 0) {
    // 요청을 해결했을 때
    models.Requests.update(
      {
        CSR_STATUS: body.CSR_STATUS,
        REAL_FINISH_DATE: body.DATE,
      },
      {
        where: {
          REQ_SEQ: params.requestId,
        },
      }
    )
      .then((result) => {
        // 수정 성공
        if (result[0] > 0) {
          models.Requests.findOne({
            attributes: ["REG_USER_ID"],
            where: {
              REQ_SEQ: params.requestId,
            },
          }).then((result) => {
            // 기기가 있는 경우 메세지 전송
            sendMsg.sendMessageToDevice(result.REG_USER_ID, params.requestId, {
              data: {
                title: "요청을 처리했습니다.",
                body: "",
              },
            });
          });
          res.send({
            resultCode: 0,
            message: "update done",
          });
        } else {
          res.send(402).send({
            resultCode: 1,
            message: "글 번호 없음",
          });
        }
      })
      .catch((err) => {
        res.status(501).send({
          resultCode: 2,
          message: "수정 실패",
        });
      });
  } else {
    // 요청을 진행으로 바꿨을 때
    models.Requests.update(
      {
        CSR_STATUS: body.CSR_STATUS,
        EXPECTED_FINISH_DATE: body.DATE,
      },
      {
        where: {
          REQ_SEQ: req.params.requestId,
        },
      }
    )
      .then((result) => {
        // 수정 성공
        if (result[0] > 0) {
          models.Requests.findOne({
            attributes: ["REG_USER_ID"],
            where: {
              REQ_SEQ: params.requestId,
            },
          }).then((result) => {
            // 기기가 있는 경우 메세지 전송
            sendMsg.sendMessageToDevice(result.REG_USER_ID, params.requestId, {
              data: {
                title: "요청이 곧 처리됩니다.",
                body: "",
              },
            });
          });
          res.send({
            resultCode: 0,
            message: "update done",
          });
        } else {
          res.send(402).send({
            resultCode: 1,
            message: "글 번호 없음",
          });
        }
      })
      .catch((err) => {
        res.status(501).send({
          resultCode: 2,
          message: "수정 실패",
        });
      });
  }
};
