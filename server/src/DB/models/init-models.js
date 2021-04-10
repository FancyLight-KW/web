var DataTypes = require("sequelize").DataTypes;
var _Requests = require("./Requests");
var _SequelizeMeta = require("./SequelizeMeta");
var _Users = require("./Users");

function initModels(sequelize) {
  var Requests = _Requests(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Requests.belongsTo(Users, { as: "REG_USER", foreignKey: "REG_USER_ID"});
  Users.hasMany(Requests, { as: "Requests", foreignKey: "REG_USER_ID"});

  return {
    Requests,
    SequelizeMeta,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
