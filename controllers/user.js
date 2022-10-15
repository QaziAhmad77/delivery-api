const { Users, UserOtps } = require("../models");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      if (!name || !email || !password || !phoneNumber) {
        throw { error: 400, message: "Required fields can't be empty." };
      }
      const nameFound = await Users.findOne({
        where: { name },
      });
      if (nameFound) {
        throw { error: 409, message: "Name already exists" };
      }
      let user = await Users.create({
        name,
        email,
        phone_number: phoneNumber,
        password,
      });
      user = user.toJSON();
      delete user.password;
      const token = jwt.sign({ user }, "jwt_secret");
      return res.status(200).send({ user, token });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  logIn: async (req, res) => {
    try {
      let { user } = req;
      console.log(user.id);
      const { name, password } = req.body;
      if (!name || !password) {
        throw { status: 400, message: "Required fields cannot be empty." };
      }
      if (user.name !== name) {
        throw { error: 404, message: "user name does not exists" };
      }
      const hashedPassword = await bcrypt.compare(password, user.password);
      if (!hashedPassword) {
        throw { status: 401, message: "Password is incorrect" };
      }
      //   res.status(200).send({user})
      res
        .status(301)
        .redirect("http://localhost:3000/api/users/:userId/logIn/homePage");
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  homePage: async (req, res) => {
    res.status(200).render("homepage");
  },
  update: async (req, res) => {
    try {
      const { name } = req.body;
      let { user } = req;
      let updatedUser = await user.update({
        name: name ? name : user.name,
      });
      updatedUser = updatedUser.toJSON();
      delete updatedUser.password;
      return res.status(200).send({ updatedUser });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  emailSend: async (req, res) => {
    try {
      const { email } = req.body;
      const userEmail = await Users.findOne({
        where: { email },
      });
      if (!userEmail) {
        throw { status: 400, message: "Email does not exists." };
      }
      let otp = Math.floor(Math.random() * 1000000 + 1);
      let userOtp = await UserOtps.create({
        email,
        otp,
      });
      mailer("your email", "your otp");
      res.send(userOtp);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
  changePassword: async (req, res) => {
    try {
      const { email, otp, password } = req.body;
      if (otp.toString().length != 6) {
        throw { error: 400, message: "OTP must be a 6 digits number." };
      }
      const verifyOtp = await UserOtps.findOne({
        where: {
          email,
          otp,
        },
        order: [["createdAt", "DESC"]],
      });
      if (moment().unix() > verifyOtp.expiry) {
        throw { error: 403, message: "OTP is expired." };
      }
      let user = await Users.findOne({
        where: { email },
      });
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      user = await user.update({
        password: hashedPassword,
      });
      user = user.toJSON();
      delete user.password;
      res.status(200).send({ user });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .message(err.message || "Something went wrong...");
    }
  },
};
const mailer = (email, otp) => {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email",
      pass: "your password",
    },
  });
  send();
  async function send() {
    const result = await transporter.sendMail({
      from: "your email",
      to: "recievers email",
      subject: "Hello World",
      text: "Hello World",
    });

    console.log(JSON.stringify(result, null, 4));
  }
};
