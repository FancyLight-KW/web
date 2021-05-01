const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Devices = sequelize.define(
    "Devices",
    {
      DEVICE_USER_ID: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "User_id",
        },
      },
      DEVICE_ID: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Devices",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "DEVICE_USER_ID" }],
        },
        {
          name: "DEVICE_USER_ID_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "DEVICE_USER_ID" }],
        },
      ],
    }
  );
  Devices.associate = function (models) {
    Devices.belongsTo(models.Users, {
      as: "DEVICE_USER",
      foreignKey: "DEVICE_USER_ID",
    });
  };

  return Devices;
};
