/*
 *
 *   DB Intents CRUD Function
 *
 */

const models = require("../../../../DB/models");

// CREATE
exports.create = (req, res) => {
  models.Intents.bulkCreate(req.body.data)
    .then((result) => {
      res.send({
        result: result,
        resultCode: 0,
        message: "인텐트 생성 성공",
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
    query["INTENT_ID"] = param.id;
  }
  if (param.title) {
    query["INTENT_TITLE"] = param.title;
  }

  models.Intents.findAll({
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

  models.Intents.update(
    { INTENT_TITLE: req.body.INTENT_TITLE },
    {
      where: {
        INTENT_ID: id,
      },
    }
  )
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

  models.Intents.destroy({
    where: {
      INTENT_ID: id,
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
        message: "삭제 실패",
      });
    });
};
