const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define(
    "Users",
    {
      User_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      User_password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      User_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      User_lastlogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      User_position: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: "Users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "User_id" }],
        },
        {
          name: "User_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "User_id" }],
        },
      ],
    }
  );

  Users.associate = function (models) {
    Users.hasOne(models.Devices, {
      foreignKey: "DEVICE_USER_ID",
    });
    Users.hasMany(models.Requests, {
      foreignKey: "REG_USER_ID",
    });
  };

  return Users;
};
