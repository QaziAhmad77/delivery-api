"use strict";
const moment = require("moment");
const tableName = "parcels";

module.exports = (sequelize, DataTypes) => {
  const Parcel = sequelize.define(tableName, {
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
  Parcel.beforeCreate((parcel) => {
    parcel.dataValues.createdAt = moment().unix();
    parcel.dataValues.updatedAt = moment().unix();
  });
  Parcel.beforeUpdate((parcel) => {
    parcel.dataValues.updatedAt = moment().unix();
  });
  return Parcel;
};
