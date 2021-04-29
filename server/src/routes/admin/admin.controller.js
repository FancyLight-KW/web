const models = require("../../DB/models");
const Sequelize = require("sequelize");
const sendMsg = require("../android/sendMsg");
const Op = Sequelize.Op;

// 진행중인 요청
exports.receiptRequest = (req, res) => {
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
      MOD_USER_ID: { [Op.eq]: null },
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "admin page error",
      });
    });
};

exports.denyRequest = (req, res) => {};

exports.allocateAgent = (req, res) => {
  let body = req.body;
  models.Requests.update(
    {
      MOD_USER_ID: body.MOD_USER_ID,
      CSR_STATUS: "접수완료",
    },
    {
      where: {
        REQ_SEQ: body.REQ_SEQ,
      },
    }
  )
    .then(async (result) => {
      // send message to android
      console.log(result[0]);
      if (result[0] > 0) {
        let msg = {
          notification: {
            title: "새로운 요청이 들어왔어요",
            body: "헤헤",
          },
          data: {
            test: "안녕",
          },
        };

        if (sendMsg.sendMessageToDevice(body.MOD_USER_ID, msg) != 0) {
          res.status(503).send({
            resultCode: 3,
            message: "메세지 전송 실패",
          });
        } else {
          res.send({
            resultCode: 0,
            message: `${body.REQ_SEQ} 할당 성공`,
          });
        }
      } else {
        res.status(502).send({
          resultCode: 2,
          message: "찾을 수 없는 요원입니다.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send({
        resultCode: 1,
        message: "할당 실패",
      });
    });
};

exports.searchAgent = (req, res) => {
  models.sequelize
    .query(
      `SELECT MOD_USER_ID, 
      Users.User_name as NAME,
      COUNT(case when CSR_STATUS="접수완료" then 1 end) as READY,
      COUNT(case when CSR_STATUS="요청처리중" then 1 end) as DOING
      FROM Project.Requests  JOIN Users ON MOD_USER_ID=Users.User_id
      GROUP BY MOD_USER_ID
      ORDER BY DOING;`,
      {
        type: models.Sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      res.send(result);
    });
};
