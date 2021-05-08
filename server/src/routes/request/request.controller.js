const models = require("../../DB/models");
const Sequelize = require("sequelize");
const moment = require("../../config/moment.config");
const fs = require("fs");
const path = require("path");

const Op = Sequelize.Op;

exports.like = (keyword) => {
  return { [Op.like]: `%${keyword}%` };
};

exports.queryString = (params) => {
  let query = {};
  let title = params.title ? decodeURIComponent(params.title) : "";
  let user = params.user ? decodeURIComponent(params.user) : "";
  let targetCode = params.targetcode
    ? decodeURIComponent(params.targetcode)
    : "";
  let csrStatus = params.csrstatus ? decodeURIComponent(params.csrstatus) : "";

  console.log(query);
  if (params.reqNo) {
    let reqNo = params.reqNo ? params.reqNo : "";
    query["REQ_SEQ"] = reqNo;
  }

  if (params.agent) {
    let agent = params.agent ? params.agent : "";
    query["MOD_USER_ID"] = this.like(agent);
  }
  //console.log(keyword, search);
  query["REG_USER_ID"] = this.like(user);
  query["TITLE"] = this.like(title);
  query["TARGET_CODE"] = this.like(targetCode);
  query["CSR_STATUS"] = this.like(csrStatus);

  let startDate = params.startDate
    ? moment(params.startDate).format("YYYY-MM-DD HH:mm:ss")
    : moment(0).format("YYYY-MM-DD HH:mm:ss");
  let endDate = params.endDate
    ? moment(params.endDate).format("YYYY-MM-DD 23:59:59")
    : moment().format("YYYY-MM-DD HH:mm:ss");

  query["createdAt"] = {
    [Op.between]: [startDate, endDate],
  };

  return query;
};

// 요청 생성
exports.create = (req, res) => {
  console.log("req.body: ", JSON.stringify(req.user));
  let body = JSON.parse(req.body.body);

  while (typeof body != "object") {
    body = JSON.parse(body);
  }

  if (!body) {
    res.status(400).send({ message: "no data!" });
  }

  let query = {
    //REQ_SEQ: body.REQ_SEQ,
    TITLE: body.TITLE,
    CONTENT: body.CONTENT,
    CORP_CODE: body.CORP_CODE,
    TARGET_CODE: body.TARGET_CODE,
    SYSTEM_GROUP_CODE: body.SYSTEM_GROUP_CODE,
    TM_APPROVAL_REQ_YN: body.TM_APPROVAL_REQ_YN,
    CSR_STATUS: body.CSR_STATUS,
    REQ_FINISH_DATE: body.REQ_FINISH_DATE,
    REG_USER_ID: req.user.User_id,
    //REG_DATE: moment().format('YYYYMMDD-HH:mm:ss'),
    MOD_USER_ID: body.MOD_USER_ID,
  };

  if (req.file) {
    query["REQ_IMG_PATH"] =
      process.env.SERVER_HOST + "/uploads/" + req.file.filename;
  }
  console.log("query: ", query);
  models.Requests.create(query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
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

exports.findImage = (req, res) => {
  models.Requests.findAll({
    where: {
      REQ_SEQ: req.params.requestId,
    },
  }).then((result) => {
    res.send({
      image: process.env.SERVER_HOST + "/uploads/" + result[0].REQ_IMG_PATH,
    });
  });
};

exports.update = (req, res) => {
  let body = JSON.parse(req.body.body);

  while (typeof body != "object") {
    console.log("while" + body);
    body = JSON.parse(body);
  }

  if (!body) {
    res.status(400).send({
      resultCode: 2,
      message: "Content cannot empty",
    });
  }

  let query = {
    TITLE: body.TITLE,
    CONTENT: body.CONTENT,
    CORP_CODE: body.CORP_CODE,
    TARGET_CODE: body.TARGET_CODE,
    SYSTEM_GROUP_CODE: body.SYSTEM_GROUP_CODE,
    TM_APPROVAL_REQ_YN: body.TM_APPROVAL_REQ_YN,
    CSR_STATUS: body.CSR_STATUS,
    REQ_FINISH_DATE: body.REQ_FINISH_DATE,
    REG_USER_ID: body.REG_USER_ID,
    REG_DATE: body.REG_DATE,
    MOD_USER_ID: body.MOD_USER_ID,
    //updatedAt: nowDate,
  };

  if (req.file) {
    models.Requests.findOne({
      attributes: ["REQ_IMG_PATH"],
      where: {
        REQ_SEQ: req.params.requestId,
      },
    })
      .then((result) => {
        if (result.REQ_IMG_PATH) {
          let filePath = result.REQ_IMG_PATH;
          let pastFile = filePath.split("/").slice(-1).pop();

          fs.unlink(path.join(appRoot, "uploads", pastFile), (err) => {
            if (err) {
              console.log(err);
              res.send({
                resultCode: 3,
                message: err,
              });
            }
          });
        }
      })
      .catch();
    query["REQ_IMG_PATH"] =
      process.env.SERVER_HOST + "/uploads/" + req.file.filename;
  }
  models.Requests.update(query, {
    where: {
      REQ_SEQ: req.params.requestId,
    },
  })
    .then((result) => {
      if (result[0] == 1) {
        res.send({
          resultcode: 0,
          message: "업데이트 완료",
        });
      } else {
        res.status(400).send({
          resultcode: 1,
          message: "수정할 수 없습니다.",
        });
      }
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
      if (result > 0) {
        res.send({
          resultCode: 0,
          message: `${req.params.requestId} delete success`,
        });
      } else {
        res.status(500).send({
          resultCode: 1,
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
  let query = this.queryString(req.query);
  console.log(query);
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
    where: query,
    order: [["REQ_SEQ", "DESC"]],
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "Find Request Error",
      });
    });
};
