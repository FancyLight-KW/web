var DataTypes = require("sequelize").DataTypes;
var _Devices = require("./Devices");
var _Requests = require("./Requests");
var _SequelizeMeta = require("./SequelizeMeta");
var _Users = require("./Users");

function initModels(sequelize) {
  var Devices = _Devices(sequelize, DataTypes);
  var Requests = _Requests(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Devices.belongsTo(Users, { as: "DEVICE_USER", foreignKey: "DEVICE_USER_ID" });
  Users.hasOne(Devices, { as: "Device", foreignKey: "DEVICE_USER_ID" });
  Requests.belongsTo(Users, { as: "REG_USER", foreignKey: "REG_USER_ID" });
  Users.hasMany(Requests, { as: "Requests", foreignKey: "REG_USER_ID" });

  return {
    Devices,
    Requests,
    SequelizeMeta,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
