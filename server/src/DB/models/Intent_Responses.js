const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const IR = sequelize.define(
    "Intent_Responses",
    {
      RESPONSE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      RESPONSE_INTENT_ID: {
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
          fields: [{ name: "RESPONSE_ID" }],
        },
        {
          name: "rid_idx",
          using: "BTREE",
          fields: [{ name: "RESPONSE_INTENT_ID" }],
        },
        {
          name: "response_idx",
          using: "BTREE",
          fields: [{ name: "RESPONSE_INTENT_ID" }],
        },
      ],
    }
  );
  IR.associate = function (models) {
    IR.belongsTo(models.Intents, {
      as: "RESPONSE_INTENT",
      foreignKey: "RESPONSE_INTENT_ID",
    });
  };
  return IR;
};
