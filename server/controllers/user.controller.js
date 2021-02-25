const User = require("../API/models/user/user.model.js");

// 새 유저 생성
exports.create = (req, res) => {
  console.log(req.body);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  //Json
  const user = new User({
    //User_Index: req.body.User_Index,
    User_ID: req.body.User_ID,
    User_PWD: req.body.User_PWD,
    User_Name: req.body.User_Name,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Insert Failed.",
      });
    else res.send(data);
  });
};

// 모든 유저 목록 send
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error",
      });
    } else {
      res.send(data);
    }
  });
};

// 유저 index로 회원 찾음
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `not found user id: ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `error user id: ${req.params.userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// 유저 정보 변경
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `not found user id: ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `error user id: ${req.params.userId}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// 유저 삭제
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `not found user id: ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `error user id: ${req.params.userId}`,
        });
      }
    } else {
      res.send({
        message: `user deleted successfully`,
      });
    }
  });
};

// 모든 데이터 삭제
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error",
      });
    } else {
      res.send({
        message: `All users deleted successfully`,
      });
    }
  });
};
