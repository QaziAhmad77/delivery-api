"use strict";
const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
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
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(user.getDataValue("password"), salt);
    user.setDataValue("password", hashedPassword);
    user.dataValues.createdAt = moment().unix();
    user.dataValues.updatedAt = moment().unix();
  });
  User.beforeUpdate((user) => {
    user.dataValues.updatedAt = moment().unix();
  });
  return User;
};
