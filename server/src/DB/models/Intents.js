const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Intents = sequelize.define(
    "Intents",
    {
      INTENT_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      INTENT_TITLE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Intents",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "INTENT_ID" }],
        },
      ],
    }
  );
  Intents.associate = function (models) {
    Intents.hasMany(models.Intent_Prases, {
      as: "Intent_Prases",
      foreignKey: "PRASES_INTENT_ID",
    });
    Intents.hasMany(models.Intent_Responses, {
      as: "Intent_Responses",
      foreignKey: "RESPONSE_INTENT_ID",
    });
  };
  return Intents;
};
