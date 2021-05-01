const models = require("../../DB/models");

//모든 요원 list
exports.findAllAgent = (req, res) => {
  models.Users.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: models.Users,
        as: "REG_USER",
        attributes: ["User_name"],
      },
    ],
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
//요원에게 할당된 요청
exports.findAllUSerDisposeRequest = (req, res) => {
  models.Requests.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: models.Users,
        as: "REG_USER",
        attributes: ["User_name"],
      },
    ],
    where: {
      MOD_USER_ID: req.user.User_id,
      CSR_STATUS: "접수완료",
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

//요청 날짜 수정
exports.updateRequest = (req, res) => {
  let body = req.body;
  let params = req.params;

  if (params.isfinished) {
    models.Requests.update(
      {
        CSR_STATUS: body.CSR_STATUS,
        REAL_FINISH_DATE: body.DATE,
      },
      {
        where: {
          REQ_SEQ: req.params.requestId,
        },
      }
    )
      .then((result) => {
        // 수정 성공
        if (result[0] > 0) {
          res.send({
            resultCode: 0,
            message: "update done",
          });
        } else {
          res.send(402).send({
            resultCode: 1,
            message: "글 번호 없음",
          });
        }
      })
      .catch((err) => {
        res.status(501).send({
          resultCode: 2,
          message: "수정 실패",
        });
      });
  } else {
    models.Requests.update(
      {
        CSR_STATUS: body.CSR_STATUS,
        EXPRECTED_FINISH_DATE: body.DATE,
      },
      {
        where: {
          REQ_SEQ: req.params.requestId,
        },
      }
    )
      .then((result) => {
        // 수정 성공
        if (result[0] > 0) {
          res.send({
            resultCode: 0,
            message: "update done",
          });
        } else {
          res.send(402).send({
            resultCode: 1,
            message: "글 번호 없음",
          });
        }
      })
      .catch((err) => {
        res.status(501).send({
          resultCode: 2,
          message: "수정 실패",
        });
      });
  }
};
