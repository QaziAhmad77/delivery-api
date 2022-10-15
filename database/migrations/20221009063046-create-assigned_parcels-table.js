"use strict";
const { DataTypes } = require("sequelize");
const tableName = "assigned_parcels";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_parcel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fk_driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parcel_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driver_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Done"),
        defaultValue: "Pending",
        allowNull: false,
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
