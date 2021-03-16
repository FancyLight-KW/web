const models = require("../../models");
const encrypt = require("../../config/password.encrypt");
const moment = require('../../config/moment.config');

// 로그인
exports.login = (req, res) => {
  let body = req.body;
  console.log("login");
  models.Users.findOne({
    where: {
      User_id: body.User_id,
    },
  })
    .then((result) => {
      if (
        result &&
        encrypt.isPasswordSame(body.User_password, result.User_password)
      ) {
        console.log("Login: succeeded");
        // Check password
        res.send({
          User_id: result.User_id,
          User_name: result.User_name,
          //User_lastlogin:
          User_position: result.User_position,
          resultCode: 0,
        });
        return done(null, result); 
      } else {
        console.log("Login: Invalid password");
        res.send({
          message: "Invalid user",
          resultCode: 1,
        });
        return done(false, null, { message: 'Incorrect user info.' });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
/*
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
            id: body.User_id,
            authorized: true,
            name: body.User_name,
          };
          console.log("세션 생성 완료.");
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

          res.send({
            User_id: result.User_id,
            User_name: result.User_name,
            User_lastlogin: nowDate,
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
*/
// 로그아웃
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if(err){
      console.log(err);
      res.send('session not destroyed');
    }else{
      console.log('session successfully destroyed');
      res.send('session destroyed');
    }
  }); // 세션 삭제
  res.clearCookie("key"); // 세션 쿠키 삭제
};
