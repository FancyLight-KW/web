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

  models.Users.findOne({
    where: {
      User_id: req.user.User_id,
    },
  })
    .then((result) => {
      if (bcrypt.isPasswordSame(body.origin_password, result.User_password)) {
        models.Users.update(
          {
            User_password: bcrypt.encrypt(body.new_password),
          },
          {
            where: {
              User_id: result.User_id,
            },
          }
        )
          .then((result) => {
            res.send({
              resultCode: 0,
              message: "비밀번호 수정 완료",
            });
          })
          .catch((err) => {
            res.status(502).send({
              resultCode: 3,
              message: "수정 실패",
            });
          });
      } else {
        res.status(405).send({
          resultCode: 1,
          message: "비밀번호가 틀렸습니다.",
        });
      }
    })
    .catch((err) => {
      res.status(501).send({
        resultCode: 2,
        message: "유저가 없습니다.",
      });
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
