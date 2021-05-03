const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const IR = sequelize.define(
    "Intent_Responses",
    {
      RESPONSES_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      RESPONSES_INTENT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Intents",
          key: "INTENT_ID",
        },
      },
      RESPONSE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Intent_Responses",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "RESPONSES_ID" }],
        },
        {
          name: "rid_idx",
          using: "BTREE",
          fields: [{ name: "RESPONSES_INTENT_ID" }],
        },
        {
          name: "response_idx",
          using: "BTREE",
          fields: [{ name: "RESPONSES_INTENT_ID" }],
        },
      ],
    }
  );
  IR.associate = function (models) {
    IR.belongsTo(models.Intents, {
      as: "RESPONSES_INTENT",
      foreignKey: "RESPONSES_INTENT_ID",
    });
  };
  return IR;
};
