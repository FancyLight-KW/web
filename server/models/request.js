'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Request.init({
    REQ_SEQ: DataTypes.INTEGER,
    TITLE: DataTypes.STRING,
    CONTENT: DataTypes.STRING,
    CORP_CODE: DataTypes.STRING,
    TARGET_CODE: DataTypes.STRING,
    SYSTEM_GROUP_CODE: DataTypes.STRING,
    SYSTEM_CODE: DataTypes.STRING,
    REQ_TYPE_CODE: DataTypes.STRING,
    TM_APPROVAL_REQ_YN: DataTypes.STRING,
    CSR_STATUS: DataTypes.STRING,
    IMSI_YN: DataTypes.STRING,
    REQ_FINISH_DATE: DataTypes.STRING,
    REG_USER_ID: DataTypes.STRING,
    REG_DATE: DataTypes.STRING,
    MOD_USER_ID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};