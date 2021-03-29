const models = require("../../models");
const Sequelize = require("sequelize");
const moment = require("../../config/moment.config");

const Op = Sequelize.Op;
const pagenation = (page, query) => {
  const PAGE_SIZE = 15;
  let pageNum = page ? page : 1;
  let offset = 0;

  if (pageNum > 1) {
    offset = PAGE_SIZE * (pageNum - 1);
  }

  return {
    offset: offset,
    limit: PAGE_SIZE,
    where: query,
  };
};
// 요청 생성
exports.create = (req, res) => {
<<<<<<< HEAD
  console.log("req.body: ", JSON.stringify(req.body));
=======
  console.log("input: ", req.body.body);
  console.log("img: ", req.files)
>>>>>>> df2edd2fe2120b719e351128dc23367af4fb002e
  let body = JSON.parse(req.body.body);

  while(typeof body != 'object'){
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
    SYSTEM_CODE: body.SYSTEM_CODE,
    REQ_TYPE_CODE: body.REQ_TYPE_CODE,
    TM_APPROVAL_REQ_YN: body.TM_APPROVAL_REQ_YN,
    CSR_STATUS: body.CSR_STATUS,
    IMSI_YN: body.IMSI_YN,
    REQ_FINISH_DATE: body.REQ_FINISH_DATE,
    REG_USER_ID: "sehwagod",
    //REG_DATE: moment().format('YYYYMMDD-HH:mm:ss'),
    MOD_USER_ID: body.MOD_USER_ID,
  };

  if (req.file) {
    query["REQ_IMG_PATH"] = "/uploads/" + req.file.filename;
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
  models.Requests.findAll(pagenation(req.query.page))
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
  const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");

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
      updatedAt: nowDate,
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
  let queryparam = req.query;
  let title = queryparam.title ? queryparam.title : "";
  let user = queryparam.user ? queryparam.user : "";
  let targetCode = queryparam.targetcode ? queryparam.targetcode : "";
  let csrStatus = queryparam.csrstatus ? queryparam.csrstatus : "";
  //console.log(keyword, search);
  const like = (keyword) => {
    return { [Op.like]: `%${keyword}%` };
  };
  let query = {};
  query["REG_USER_ID"] = like(user);
  query["TITLE"] = like(title);
  query["TARGET_CODE"] = like(targetCode);
  query["CSR_STATUS"] = like(csrStatus);

  let startDate = queryparam.startDate
    ? moment(queryparam.startDate).format("YYYY-MM-DD HH:mm:ss")
    : moment(0).format("YYYY-MM-DD HH:mm:ss");
  let endDate = queryparam.endDate
    ? moment(queryparam.endDate).format("YYYY-MM-DD 23:59:59")
    : moment().format("YYYY-MM-DD HH:mm:ss");

  query["createdAt"] = {
    [Op.between]: [startDate, endDate],
  };

  console.log(query);
  models.Requests.findAll(pagenation(queryparam.page, query))
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
