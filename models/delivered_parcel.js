"use strict";
const moment = require("moment");
const tableName = "delivered_parcels";

module.exports = (sequelize, DataTypes) => {
  const DeliveredParcel = sequelize.define(tableName, {
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
  DeliveredParcel.beforeCreate((deliveredParcel) => {
    deliveredParcel.dataValues.createdAt = moment().unix();
    deliveredParcel.dataValues.updatedAt = moment().unix();
  });
  DeliveredParcel.beforeUpdate((deliveredParcel) => {
    deliveredParcel.dataValues.updatedAt = moment().unix();
  });
  return DeliveredParcel;
};
