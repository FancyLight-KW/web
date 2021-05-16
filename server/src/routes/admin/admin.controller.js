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
      CSR_STATUS: { [Op.ne]: "요청반려" },
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

exports.denyRequest = (req, res) => {
  models.Requests.update(
    {
      CSR_STATUS: "요청반려",
    },
    {
      where: {
        REQ_SEQ: req.body.REQ_SEQ,
      },
    }
  )
    .then((result) => {
      if (result > 0) {
        res.send({
          resultCode: 0,
          message: "요청 반려 성공",
        });
      } else {
        res.status(440).send({
          resultCode: 1,
          message: "요청 검색 실패",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        resultCode: 2,
        message: "요청 반려 실패",
      });
    });
};

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
      if (result[0] > 0) {
        sendMsg.sendMessageToDevice(body.MOD_USER_ID, body.REQ_SEQ, {
          data: {
            title: "요청이 할당되었습니다.",
            body: "",
          },
        });

        res.send({
          resultCode: 0,
          message: "요원 할당 성공",
        });
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
      'SELECT User_id, User_name, \
      COUNT(case when CSR_STATUS="접수완료" then 1 end) AS READY,\
      COUNT(case when CSR_STATUS="요청처리중" then 1 end) AS DOING FROM Users \
      LEFT JOIN Requests ON User_id=MOD_USER_ID\
      WHERE User_position=2\
      GROUP BY User_id\
      order BY DOING, READY;',
      {
        type: models.Sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      res.send(result);
    });
};
