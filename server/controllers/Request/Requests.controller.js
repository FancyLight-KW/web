const models = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function parse(str) {
  let y = str.substr(0, 4),
    m = str.substr(4, 2) - 1,
    d = str.substr(6, 2);
  let D = new Date(y, m, d);
  return D.getFullYear() == y && D.getMonth() == m && D.getDate() == d
    ? D
    : "invalid date";
}

// 요청 생성
exports.create = (req, res) => {
  let body = req.body;
  let time = new Date();
  console.log(body);
  if (!body) {
    res.status(400).send({ message: "no data!" });
  }

  models.Requests.create({
    //REQ_SEQ: body.REQ_SEQ,
    TITLE: body.TITLE,
    CONTENT: body.CONTENT,
    CORP_CODE: body.CORP_CODE,
    TARGET_CODE: body.TARGET_CODE,
    SYSTEM_GROUP_CODE: body.SYSTEM_GROUP_CODE,
    SYSTEM_CODE: body.SYSTEM_CODE,
    REQ_TYPE_CODE: body.REQ_TYPE_CODE,
    TM_APPROVAL_REQ_YN: body.TM_APPROVAL_REQ_YN,
    CSR_STATUS: body.CSR_STATUS,
    IMSI_YN: body.IMSI_YN,
    REQ_FINISH_DATE: body.REQ_FINISH_DATE,
    REG_USER_ID: body.REG_USER_ID,
    REG_DATE: body.REG_DATE,
    MOD_USER_ID: body.MOD_USER_ID,
    updatedAt: time,
    createdAt: time,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// 모든 요청 가져오기
exports.findAll = (req, res) => {
  models.Requests.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.findOne = (req, res) => {
  models.Requests.findOne({
    where: {
      REG_USER_ID: req.params.userId,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot empty",
    });
  }

  let body = req.body;
  let time = new Date();

  models.Requests.update(
    {
      TITLE: body.TITLE,
      CONTENT: body.CONTENT,
      CORP_CODE: body.CORP_CODE,
      TARGET_CODE: body.TARGET_CODE,
      SYSTEM_GROUP_CODE: body.SYSTEM_GROUP_CODE,
      SYSTEM_CODE: body.SYSTEM_CODE,
      REQ_TYPE_CODE: body.REQ_TYPE_CODE,
      TM_APPROVAL_REQ_YN: body.TM_APPROVAL_REQ_YN,
      CSR_STATUS: body.CSR_STATUS,
      IMSI_YN: body.IMSI_YN,
      REQ_FINISH_DATE: body.REQ_FINISH_DATE,
      REG_USER_ID: body.REG_USER_ID,
      REG_DATE: body.REG_DATE,
      MOD_USER_ID: body.MOD_USER_ID,
      updatedAt: time,
    },
    {
      where: {
        REQ_SEQ: req.params.requestId,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({
        message: err,
      });
    });
};

exports.delete = (req, res) => {
  models.Requests.destroy({
    where: {
      REQ_SEQ: req.params.requestId,
    },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          resultcode: result,
          message: `${req.params.requestId} delete success`,
        });
      } else {
        res.status(500).send({
          message: "no data",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: err,
      });
    });
};

exports.findRequest = (req, res) => {
  let keyword = req.params.keyword;
  let search;
  if (req.params.searchParam == "user") {
    search = "REG_USER_ID";
  } else if (req.params.searchParam == "title") {
    search = "TITLE";
  } else {
    res.status(500).send({
      message: "search parameter error",
    });
  }

  //console.log(keyword, search);
  let query = {};
  let like = {
    [Op.like]: `%${keyword}%`,
  };
  query[search] = like;

  let startDate = req.query.startDate
    ? parse(req.query.startDate)
    : parse("20000101");

  let endDate = req.query.endDate ? parse(req.query.endDate) : new Date();
  query["createdAt"] = {
    [Op.between]: [startDate, endDate],
  };

  models.Requests.findAll({
    where: query,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("find err");
      res.send({
        message: "Find Request Error",
      });
    });
};
