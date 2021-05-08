"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      REQ_SEQ: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
      },
      TITLE: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      CONTENT: {
        allowNull: false,
        type: Sequelize.STRING(4000),
      },
      CORP_CODE: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      TARGET_CODE: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      SYSTEM_GROUP_CODE: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      TM_APPROVAL_REQ_YN: {
        allowNull: false,
        type: Sequelize.CHAR(1),
      },
      CSR_STATUS: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      REQ_FINISH_DATE: {
        type: Sequelize.STRING(14),
      },
      REG_USER_ID: {
        type: Sequelize.STRING(20),
      },
      MOD_USER_ID: {
        type: Sequelize.STRING(20),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Requests");
  },
};
