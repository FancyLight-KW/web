const models = require("../../DB/models");

exports.findAllAgent = (req, res) => {
  models.Users.findAll({
    where: {
      User_position: 2,
    },
  })
    .then((result) => {
      console.log(result);
      let list = [];
      result.forEach((element) => {
        list.push([element["User_id"], element["User_name"]]);
      });

      res.send({
        data: list,
      });
    })
    .catch((err) => {
      res.status(420).send({
        resultCode: 1,
        message: "요원 검색 에러",
      });
    });
};

exports.findAllUSerDisposeRequest = (req, res) => {
  models.Requests.findAll({
    where: {
      MOD_USER_ID: req.user.User_id,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: "find error",
      });
    });
};
