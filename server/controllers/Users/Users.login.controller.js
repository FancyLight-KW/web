const models = require("../../models");

// 로그인
exports.login = (req, res) => {
  models.Users.findOne({
    where: {
      User_id: req.body.User_id,
    },
  })
    .then((result) => {
      if (req.session.user) {
        console.log("이미 로그인 되어 있음");
      } else {
        req.session.user = {
          id: req.body.User_id,
          name: req.body.User_name,
          authorized: true,
        };
        console.log("세션 생성 완료.");
      }

      res.send(result);
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
