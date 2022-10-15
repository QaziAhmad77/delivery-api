"use strict";
const { DataTypes } = require("sequelize");

const table = "user_otps";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      otp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expiry: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async function (queryInterface) {
    return queryInterface.dropTable(table);
  },
};
