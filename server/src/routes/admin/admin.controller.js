const models = require("../../DB/models");
const Sequelize = require("sequelize");
const moment = require("../../config/moment.config");
const Op = Sequelize.Op;

// 진행중인 요청
exports.receiptRequest = (req, res) => {
  models.Requests.findAll({
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
