const jwt = require("jsonwebtoken");
const models = require("../../DB/models");
const encrypt = require("../../config/password.encrypt");
const moment = require("../../config/moment.config");

// 새 유저 생성
exports.create = (req, res) => {
  let body = req.body;

  if (!body) {
    res.status(400).send({
      message: "유저가 없습니다.",
    });
  }

  models.Users.findOne({
    where: {
      User_id: body.User_id,
    },
  }).then((result) => {
    //console.log(result);
    if (result != null) {
      res.send({
        message: "ID already existed",
        registerSuccess: false,
        resultCode: 1,
      });
    } else {
      models.Users.create({
        User_id: body.User_id,
        User_password: encrypt.encrypt(body.User_password),
        User_name: body.User_name,
      })
        .then((result) => {
          console.log(`새 유저 생성 성공 : ${body.User_id}`);
          res.send({
            registerSuccess: true,
            resultCode: 0,
          });
        })
        .catch((err) => {
          console.log(`유저 생성 실패: ${err}`);
          res.send({
            registerSuccess: false,
            resultCode: 2,
          });
        });
    }
  });
};

exports.login = (req, res) => {
  models.Users.findOne({
    where: {
      User_id: req.body.User_id,
    },
  })
    .then((result) => {
      if (
        encrypt.isPasswordSame(req.body.User_password, result.User_password)
      ) {
        // Check password
        const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
        models.Users.update(
          {
            User_lastlogin: nowDate,
          },
          {
            where: {
              User_id: result.User_id,
            },
          }
        );
        const token = jwt.sign(
          {
            User_id: result.User_id,
            User_name: result.User_name,
            User_lastlogin: nowDate,
            User_position: result.User_position,
          },
          process.env.SECRET,
          {
            expiresIn: "9h",
          }
        );

        res.send({
          token: token,
          resultCode: 0,
        });
      } else {
        console.log("Login: Invalid password");
        res.send({
          message: "Invalid user",
          resultCode: 1,
        });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
