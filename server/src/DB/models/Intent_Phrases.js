const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const IP = sequelize.define(
    "Intent_Phrases",
    {
      PHRASES_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      PHRASES_INTENT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Intents",
          key: "INTENT_ID",
        },
      },
      PHRASE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Intent_Phrases",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "PHRASES_ID" }],
        },
        {
          name: "rid_idx",
          using: "BTREE",
          fields: [{ name: "PHRASES_INTENT_ID" }],
        },
      ],
    }
  );
  IP.associate = function (models) {
    IP.belongsTo(models.Intents, {
      as: "PHRASES_INTENT",
      foreignKey: "PHRASES_INTENT_ID",
    });
  };
  return IP;
};
