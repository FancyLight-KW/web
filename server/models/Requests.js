const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  var Requests = sequelize.define(
    "Requests",
    {
      REQ_SEQ: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      TITLE: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "CRS 요청 제목",
      },
      CONTENT: {
        type: DataTypes.STRING(4000),
        allowNull: false,
        comment: "CRS 요청 내용",
      },
      CORP_CODE: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "DM01",
      },
      TARGET_CODE: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      SYSTEM_GROUP_CODE: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "",
      },
      SYSTEM_CODE: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      REQ_TYPE_CODE: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      TM_APPROVAL_REQ_YN: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "N",
      },
      CSR_STATUS: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      IMSI_YN: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "N",
      },
      REQ_FINISH_DATE: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      REG_USER_ID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "Users",
          key: "User_id",
        },
      },
      REG_DATE: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      MOD_USER_ID: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Requests",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "REQ_SEQ" }],
        },
        {
          name: "REQ_USER_ID_idx",
          using: "BTREE",
          fields: [{ name: "REG_USER_ID" }],
        },
      ],
    }
  );

  Requests.associate = (models) => {
    Requests.belongsTo(models.Users, {
      foreignKey: "User_id",
    });
  };

  return Requests;
};
