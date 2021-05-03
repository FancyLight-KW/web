var DataTypes = require("sequelize").DataTypes;
var _Devices = require("./Devices");
var _Intent_Phrases = require("./Intent_Phrases");
var _Intent_Responses = require("./Intent_Responses");
var _Intents = require("./Intents");
var _Requests = require("./Requests");
var _SequelizeMeta = require("./SequelizeMeta");
var _Users = require("./Users");

function initModels(sequelize) {
  var Devices = _Devices(sequelize, DataTypes);
  var Intent_Phrases = _Intent_Phrases(sequelize, DataTypes);
  var Intent_Responses = _Intent_Responses(sequelize, DataTypes);
  var Intents = _Intents(sequelize, DataTypes);
  var Requests = _Requests(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Intent_Phrases.belongsTo(Intents, {
    as: "PHRASES_INTENT",
    foreignKey: "PHRASES_INTENT_ID",
  });
  Intent_Responses.belongsTo(Intents, {
    as: "RESPONSES_INTENT",
    foreignKey: "RESPONSES_INTENT_ID",
  });
  Intents.hasMany(Intent_Phrases, {
    as: "Intent_Phrases",
    foreignKey: "PHRASES_INTENT_ID",
  });
  Intents.hasMany(Intent_Responses, {
    as: "Intent_Responses",
    foreignKey: "RESPONSES_INTENT_ID",
  });
  Devices.belongsTo(Users, { as: "DEVICE_USER", foreignKey: "DEVICE_USER_ID" });
  Users.hasOne(Devices, { as: "Device", foreignKey: "DEVICE_USER_ID" });
  Requests.belongsTo(Users, { as: "REG_USER", foreignKey: "REG_USER_ID" });
  Users.hasMany(Requests, { as: "Requests", foreignKey: "REG_USER_ID" });

  return {
    Devices,
    Intent_Phrases,
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
