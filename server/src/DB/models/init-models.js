var DataTypes = require("sequelize").DataTypes;
var _Devices = require("./Devices");
var _Intent_Prases = require("./Intent_Prases");
var _Intent_Responses = require("./Intent_Responses");
var _Intents = require("./Intents");
var _Requests = require("./Requests");
var _SequelizeMeta = require("./SequelizeMeta");
var _Users = require("./Users");

function initModels(sequelize) {
  var Devices = _Devices(sequelize, DataTypes);
  var Intent_Prases = _Intent_Prases(sequelize, DataTypes);
  var Intent_Responses = _Intent_Responses(sequelize, DataTypes);
  var Intents = _Intents(sequelize, DataTypes);
  var Requests = _Requests(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Intent_Prases.belongsTo(Intents, {
    as: "PRASES_INTENT",
    foreignKey: "PRASES_INTENT_ID",
  });
  Intent_Responses.belongsTo(Intents, {
    as: "RESPONSE_INTENT",
    foreignKey: "RESPONSE_INTENT_ID",
  });
  Intents.hasMany(Intent_Prases, {
    as: "Intent_Prases",
    foreignKey: "PRASES_INTENT_ID",
  });
  Intents.hasMany(Intent_Responses, {
    as: "Intent_Responses",
    foreignKey: "RESPONSE_INTENT_ID",
  });
  Devices.belongsTo(Users, { as: "DEVICE_USER", foreignKey: "DEVICE_USER_ID" });
  Users.hasOne(Devices, { as: "Device", foreignKey: "DEVICE_USER_ID" });
  Requests.belongsTo(Users, { as: "REG_USER", foreignKey: "REG_USER_ID" });
  Users.hasMany(Requests, { as: "Requests", foreignKey: "REG_USER_ID" });

  return {
    Devices,
    Intent_Prases,
    Intent_Responses,
    Intents,
    Requests,
    SequelizeMeta,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
