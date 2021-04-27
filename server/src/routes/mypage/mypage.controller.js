const models = require("../../DB/models");
const Sequelize = require("sequelize");
const request = require("../request/request.controller");
const Op = Sequelize.Op;

// 진행중인 요청
exports.myInProgressRequest = (req, res) => {
  models.Requests.findAll({
    raw: true,
    include: [
      {
        model: models.Users,
        as: "REG_USER",
        attributes: ["User_name"],
      },
    ],
    where: {
      REG_USER_ID: req.user.User_id,
      CSR_STATUS: { [Op.ne]: "요청완료" },
    },
    order: [
      [
        Sequelize.literal(
          `CASE WHEN "CSR_STATUS" = "접수대기" THEN 0 \
          WHEN "CSR_STATUS" = "접수완료" THEN 1 \
          WHEN "CSR_STATUS" = "요청대기중" THEN 2 END DESC`
        ),
      ],
    ],
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "mypage error",
      });
    });
};

//완료된 요청
exports.myFinishedRequest = (req, res) => {
  models.Requests.findAll({
    raw: true,
    include: [
      {
        model: models.Users,
        as: "REG_USER",
        attributes: ["User_name"],
      },
    ],
    where: {
      REG_USER_ID: req.user.User_id,
      CSR_STATUS: "처리완료",
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "done request error",
      });
    });
};
