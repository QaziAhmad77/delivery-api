"use strict";
const { DataTypes } = require("sequelize");
const tableName = "parcels";
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
      package_receiver: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pickup_location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      destination_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parcel_size: {
        type: DataTypes.ENUM("XS", "S", "M", "L", "XL"),
        allowNull: false,
      },
      payment_offer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      delivery_at_doorstep: {
        type: DataTypes.BOOLEAN,
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
