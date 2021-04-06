const models = require("../../DB/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

//여기에 접수 진행상황 count
exports.countCSR_STATUS = (req, res) => {
  models.Requests.findAll({
    attributes: [
      "CSR_STATUS",
      [sequelize.fn("count", sequelize.col("CSR_STATUS")), "cnt"],
    ],
    group: ["CSR_STATUS"],
  }).then((result) => {
    let j = {};
    console.log(result);
    Object.keys(result).forEach((i) => {
      j[result[i].CSR_STATUS] = result[i].cnt;
    });
    res.send(j);
  });
};
