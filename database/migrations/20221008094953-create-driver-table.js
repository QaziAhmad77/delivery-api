"use strict";
const { DataTypes } = require("sequelize");
const tableName = "drivers";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      make: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lincense_image_front_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lincense_image_back_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      license_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      driving_miles: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      clients_feedback: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  },
};
