"use strict";
const moment = require("moment");
const tableName = "assigned_parcels";

module.exports = (sequelize, DataTypes) => {
  const AssignedParcel = sequelize.define(tableName, {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Done"),
      defaultValue: "Pending",
      allowNull: false,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
  AssignedParcel.beforeCreate((assignedParcel) => {
    assignedParcel.dataValues.createdAt = moment().unix();
    assignedParcel.dataValues.updatedAt = moment().unix();
  });
  AssignedParcel.beforeUpdate((assignedParcel) => {
    assignedParcel.dataValues.updatedAt = moment().unix();
  });
  return AssignedParcel;
};
