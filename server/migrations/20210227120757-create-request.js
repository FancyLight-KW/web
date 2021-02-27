'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      REQ_SEQ: {
        type: Sequelize.INTEGER
      },
      TITLE: {
        type: Sequelize.STRING
      },
      CONTENT: {
        type: Sequelize.STRING
      },
      CORP_CODE: {
        type: Sequelize.STRING
      },
      TARGET_CODE: {
        type: Sequelize.STRING
      },
      SYSTEM_GROUP_CODE: {
        type: Sequelize.STRING
      },
      SYSTEM_CODE: {
        type: Sequelize.STRING
      },
      REQ_TYPE_CODE: {
        type: Sequelize.STRING
      },
      TM_APPROVAL_REQ_YN: {
        type: Sequelize.STRING
      },
      CSR_STATUS: {
        type: Sequelize.STRING
      },
      IMSI_YN: {
        type: Sequelize.STRING
      },
      REQ_FINISH_DATE: {
        type: Sequelize.STRING
      },
      REG_USER_ID: {
        type: Sequelize.STRING
      },
      REG_DATE: {
        type: Sequelize.STRING
      },
      MOD_USER_ID: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Requests');
  }
};