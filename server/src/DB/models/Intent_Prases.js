const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const IP = sequelize.define(
    "Intent_Prases",
    {
      PRASES_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      PRASES_INTENT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Intents",
          key: "INTENT_ID",
        },
      },
      PRASE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Intent_Prases",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "PRASES_ID" }],
        },
        {
          name: "rid_idx",
          using: "BTREE",
          fields: [{ name: "PRASES_INTENT_ID" }],
        },
      ],
    }
  );
  IP.associate = function (models) {
    IP.belongsTo(models.Intents, {
      as: "PRASES_INTENT",
      foreignKey: "PRASES_INTENT_ID",
    });
  };
  return IP;
};
