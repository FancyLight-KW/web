const models = require("../../models");
const encrypt = require("./encrypt");

// 로그인
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
        if (req.session.user) {
          console.log("이미 로그인 되어 있음");
        } else {
          req.session.user = {
            id: req.body.User_id,
            name: req.body.User_name,
            authorized: true,
          };
          console.log("세션 생성 완료.");

          res.send({
            User_id: result.User_id,
            User_name: result.User_name,
            //User_lastlogin:
            User_position: result.User_position,
            resultCode: 0,
          });
        }
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

// 로그아웃
exports.logout = (req, res) => {
  req.session.destroy(); // 세션 삭제
  res.clearCookie("key"); // 세션 쿠키 삭제
};
