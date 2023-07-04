const express = require("express");
const userRoute = express.Router();
const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const nodemailer = require("nodemailer");
// const cors = require("cors");

const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  userName: Joi.string().alphanum().min(3).max(100),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(50).required(),
  userType: Joi.string().min(3).max(20),
});

userRoute.get("/", (req, res) => {
  res.send("we are at user route with get request...");
});

// user dashboard restricted route
userRoute.get("/user-dashboard", verifyToken, (req, res) => {
  res.send("Accessed to user dashboard, user token verified...");
});

// Admin dashboard restricted route
userRoute.get("/admin-dashboard", verifyToken, (req, res) => {
  res.send("Accessed to Admin dashboard, user token verified...");
});

// user Register route get request
userRoute.get("/register", async (req, res) => {
  try {
    const userResponse = await User.find();
    res.json(userResponse);
  } catch (err) {
    console.log(err);
  }
});

// get single user
userRoute.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) return res.status(404).send("User not found");
    return res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
  }
});

// user Register route post request
userRoute.post("/register", async (req, res) => {
  const validationMsg = userSchema.validate(req.body);

  if (validationMsg.error) {
    res.send(validationMsg.error.details[0].message);
  } else {
    const alreadyUser = await User.findOne({ email: req.body.email });
    if (alreadyUser) {
      res.send("User has already Register...");
      console.log(alreadyUser);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      // insert into DB!!!
      const userRegResponse = await User.create({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        userType: req.body.userType,
      });
      res.status(201).send(userRegResponse.fullName + " has successfully register");
    }
  }
});

// User login route
userRoute.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.send("User not found...");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.send("Invalid Password...");
      } else {
        // create token if user is valid
        const token = jwt.sign(
          { _id: user._id, iat: Date.now() },
          process.env.SECRET
        );
        // res.send("Login Successfull !!!");
        res.send({ token: token, user: user });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// send mail from user post request
userRoute.post("/send-mail", async (req, res) => {
  const text = req.body.text;

  // function of nodmailer that allow to send email
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // object of mail options
  try {
    await transport.sendMail({
      from: req.body.sender,
      to: req.body.receiver,
      subject: "Booking a Ride",
      html: `<p>${text}</p>`,
    });
    res.send(
      `Mail sent!!!
      Thank you for booking a ride, have a safe journey...`
    );
  } catch (err) {
    res.send(err);
  }
});

userRoute.patch("/:id", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          fullName: req.body.fullName,
          userName: req.body.userName,
          email: req.body.email,
          userType: req.body.userType,
        },
      }
    );
    res.send(`${req.body.fullName} has successfully updated...`);
  } catch (err) {
    res.send(err);
  }
});
userRoute.delete("/", (req, res) => {
  res.send("we are at user route with delete request...");
});

module.exports = userRoute;
