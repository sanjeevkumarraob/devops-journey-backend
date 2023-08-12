//importing modules
const express = require("express");
const db = require("../Models");
const config = require("config");
const jwt = require("jsonwebtoken");
//Assigning db.users to User variable
const User = db.users;
const authConfig = config.get("auth");

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.json(409).send("username already taken");
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.json(409).send("Authentication failed");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const validateUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    //get token from request header
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) res.sendStatus(400).send("Token not present");
    jwt.verify(token, authConfig.secretKey, (err, user) => {
      if (err) {
        res.status(403).send("Token invalid");
      } else {
        req.user = user;
        next(); //proceed to the next action in the calling function
      }
    }); //end of jwt.verify()
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  saveUser,
  validateUser,
};
