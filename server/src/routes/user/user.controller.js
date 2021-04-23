const models = require("../../DB/models");
const bcrypt = require("../../config/password.encrypt");

exports.userList = (req, res) => {
  models.Users.findAll({
    attributes: ["User_id"],
  })
    .then((result) => {
      res.send(Array.from(result, (x) => x["User_id"]));
    })
    .catch((err) => {
      res.send(err);
    });
};
// 유저 id로 회원 찾음
exports.findOne = (req, res) => {
  models.Users.findOne({
    where: {
      User_id: req.params.userId,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`id 찾기 에러: `, err);
    });
};

// 유저 정보 변경
exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let body = req.body;
  if (bcrypt.isPasswordSame(body.User_pass));
  models.Users.update(
    {
      User_password: bcrypt.encrypt(body.User_password),
    },
    {
      where: {
        User_id: req.params.userId,
      },
    }
  )
    .then((result) => {
      console.log(`데이터 수정 완료, `, result);
      res.send(result);
    })
    .catch((err) => {
      console.log(`수정 실패, `, err);
    });
};

// 유저 삭제
exports.delete = (req, res) => {
  models.Users.destroy({
    where: {
      User_id: req.params.userId,
    },
  })
    .then((result) => {
      console.log(`${req.params.userId} 삭제완료. `);
      res.send({
        resultcode: result,
      });
    })
    .catch((err) => {
      console.log("유저 삭제 실패.", err);
    });
};
