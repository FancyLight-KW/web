const models = require("../../models");
const bcrypt = require("./encrypt");

// 새 유저 생성
exports.create = (req, res) => {
  //console.log(`create:`, req.body);

  if (!req.body) {
    res.status(400).send({
      message: "유저가 없습니다.",
    });
  }

  models.Users.create({
    User_id: req.body.User_id,
    User_password: bcrypt.encrypt(req.body.User_password),
    User_name: req.body.User_name,
  })
    .then((result) => {
      console.log(`새 유저 생성 성공 : ${req.body.User_id}`);
      res.send(result);
    })
    .catch((err) => {
      console.log(`유저 생성 실패: ${err}`);
    });
};

// 모든 유저 목록 send
exports.findAll = (req, res) => {
  models.Users.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`모든 유저목록 출력 실패`, err);
    });
};

// 유저 id로 회원 찾음
exports.findOne = (req, res) => {
  models.Users.findOne({
    where: {
      User_id: req.body.User_id,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`id 찾기 에러: `, err);
    });
};

// 로그인
exports.login = (req, res) => {
  models.Users.findOne({
    where: {
      User_id: req.body.User_id,
    },
  })
    .then((result) => {
      if (req.session.user) {
        console.log('이미 로그인 되어 있음');
      } else {
        req.session.user =
            {
                id: req.body.User_id,
                name: req.body.User_name,
                authorized: true
            };
            console.log("세션 생성 완료.");
      }

      res.send(result);
    })
    .catch((err) => {
      console.log(`id 찾기 에러: `, err);
      res.send({ message: "Wrong username/password combination!" });
    });
};

exports.logout = (req, res) => {
  req.session.destory();  // 세션 삭제
  res.clearCookie('key'); // 세션 쿠키 삭제
};

// 유저 정보 변경
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let body = req.body;

  models.Users.update(
    {
      User_id: body.User_id,
      User_password: bcrypt.encrypt(body.User_password),
      User_name: body.User_name,
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
