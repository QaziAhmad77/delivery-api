"use strict";
const { DataTypes } = require("sequelize");
const tableName = "delivered_parcels";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fk_parcel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_feedback: {
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
