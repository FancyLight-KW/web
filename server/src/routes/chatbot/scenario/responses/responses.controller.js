/*
 *
 *   DB Intent_Responses CRUD Function
 *
 */

const models = require("../../../../DB/models");

// CREATE
exports.create = (req, res) => {
  models.Intent_Responses.bulkCreate(req.body.data)
    .then((result) => {
      res.send({
        resultCode: 0,
        message: "구문 생성 성공",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        resultCode: 1,
        message: err,
      });
    });
};

// READ
exports.find = (req, res) => {
  let param = req.query;
  let query = {};

  if (param.id) {
    query["RESPONSES_ID"] = param.id;
  }
  if (param.rid) {
    query["RESPONSES_INTENT_ID"] = param.rid;
  }
  if (param.phrase) {
    query["RESPONSE"] = param.response;
  }

  models.Intent_Responses.findAll({
    where: query,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({
        resultCode: 1,
        message: "검색 실패",
      });
    });
};

exports.update = (req, res) => {
  let id = req.params.id;
  let body = req.body;

  if (!body) {
    res.send({
      resultCode: 3,
      message: "데이터 없음",
    });
  }
  let attribute = {};

  if (body.RESPONSES_INTENT_ID) {
    attribute["RESPONSES_INTENT_ID"] = body.RESPONSES_INTENT_ID;
  }
  if (body.RESPONSE) {
    attribute["RESPONSE"] = body.RESPONSE;
  }
  models.Intent_Responses.update(attribute, {
    where: {
      RESPONSES_ID: id,
    },
  })
    .then((result) => {
      if (result > 0) {
        res.send({
          resultCode: 0,
          message: "수정 성공",
        });
      } else {
        res.status(400).send({
          resultCode: 1,
          message: "검색 실패",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        resultCode: 2,
        message: "수정 오류",
      });
    });
};

exports.delete = (req, res) => {
  let id = req.params.id;

  models.Intent_Responses.destroy({
    where: {
      RESPONSES_ID: id,
    },
  })
    .then((result) => {
      if (result > 0) {
        res.send({
          resultCode: 0,
          message: "삭제 성공",
        });
      } else {
        res.status(400).send({
          resultCode: 1,
          message: "검색 실패",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        resultCode: 2,
        message: "삭제 실패" + err,
      });
    });
};
