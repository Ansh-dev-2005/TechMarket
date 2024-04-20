import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import crypto, { sign } from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";

const encryptPassword = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};
//Private Key For JWT Signing
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "keys", "private.pem"),
  "utf-8"
);

//SignIn Function
const signIn = async (req, res) => {
  //Try-Catch Block
  console.log(req.body);
  try {
    const { email, password } = req.body;
    console.log(email);
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        error: error,
        console: "User/Password Incorrect!",
        message: "User/Password Incorrect!1",
      });
    }
    if (encryptPassword(password, user.salt) !== user.encpy_password) {
      return res.status(401).json({
        error: true,
        console: "User/Password Incorrect!",
        message: "User/Password Incorrect!2",
      });
    }
    console.log(user);
    //Signing JWT Token
    const jwtToken = jwt.sign(
      {
        _id: user._id, //User ID
        user: {
          email: user.email, //Firebase UID
          firstName: user.firstName, //User firstName
          role: user.userType,
        },
      },
      privateKey, //Private Key
      {
        algorithm: "RS256", //Algorithm
        allowInsecureKeySizes: true, //Must Be False In Production
        expiresIn: user.userType === "admin" ? "1h" : "60d", //Expiry
      }
    );
    console.log("JWT Token:");
    let time = new Date();
    time.setTime(time.getTime() + 1800 * 1000);
    user.salt = undefined;
    user.encpy_password = undefined;
    res.cookie("user", jwtToken, {
      expire: time,
      path: "/",
      domain: "localhost",
    });
    //Success
    res.json({
      success: true,
      token: jwtToken,
      dbRes: user,
    });
  } catch (err) {
    //On Error
    res.status(400).json({
      error: true,
      console: "User/Password Incorrect!3",
      message: err,
    });
  }
};

const signup = async (req, res) => {
  //Try-Catch Block
  try {
    const { email, username, password, firstName, userType } = req.body;
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(400).json({
        error: true,
        message: "User Already Exists!",
      });
    }

    console.log(req.body);
    let salt = crypto.randomUUID();
    let user = new User({
      email: email,
      username: username,
      firstName: firstName,
      userType: userType,
      encpy_password: encryptPassword(password, salt),
      salt: salt,
    });

    let newuser = await user.save();
    //Signing JWT Token
    const jwtToken = jwt.sign(
      {
        _id: user._id, //User ID
        user: {
          email: user.email, //Firebase UID
          firstName: user.firstName, //User firstName
          role: user.userType,
        },
      },
      privateKey, //Private Key
      {
        algorithm: "RS256", //Algorithm
        allowInsecureKeySizes: true, //Must Be False In Production
        expiresIn: "1d", //Expiry
      }
    );
    let time = new Date();
    time.setTime(time.getTime() + 1800 * 1000);
    user.salt = undefined;
    user.encpy_password = undefined;
    res.cookie("techmarket", jwtToken, {
      expire: time,
    });
    res.cookie("user", "jwtToken", {
      expire: time,
      path: "/",
      domain: "localhost",
    });

    //Success
    res.json({
      success: true,
      token: jwtToken,
      dbRes: user,
    });
  } catch (err) {
    //On Error
    console.log(err);
    res.status(400).json({
      error: true,
      message: "new",
    });
  }
};
const loggout = async (req, res) => {
  try {
    res.clearCookie("gps", {
      path: "/",
      domain: "localhost",
      expires: new Date(1),
    });
    res.status(200).json({
      logout: true,
      redirect: true,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: err,
    });
  }
};

//Verify Token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  // Check if token is present
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, privateKey);
    console.log(decoded);

    // Attach the decoded token to the request object for later use
    req.auth = decoded;

    // Move to the next middleware
    next();
  } catch (err) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};

//Check Authorization Function
const checkAuthorization = async (req) => {
  //Destructure req.auth
  let { _id } = req.auth;
  //Try-Catch Block
  try {
    //Find User
    let user = await User.findOne({ _id: _id });
    //Exists
    if (user) return true; //TRUE

    //Does'nt Exist
    return false; //FALSE
  } catch (err) {
    //On Error
    return false; //FALSE
  }
};

export const userDetails = async (req, res) => {
  // Destructure req.params
  console.log(req.params);
  let id = req.params.id; // Assign the value of req.params.id directly
  console.log(id);
  // Try-Catch Block
  try {
    // Find User
    let user = await User.findOne({ _id: id });

    // Check if user exists

    res.json(user); // Send user as response

    // If user doesn't exist
  } catch (err) {
    // On Error
    console.error(err);
    return false;
  }
};

const isSignedIn = async (req) => {
  //Destructure req.auth
  console.log(req.auth);
  let { _id } = req.auth;
  console.log(_id);
  //Try-Catch Block
  try {
    //Find User
    let user = await User.findOne({ _id: _id });
    console.log(user);
    //Exists
    console.log("User: ", user);
    if (user) return true; //TRUE

    //Doesn't Exist
    return false; //FALSE
  } catch (err) {
    //On Error
    console.log(err);
    return false; //FALSE
  }
};

const isAdmin = async (req) => {
  //Destructure req.auth
  let { _id } = req.auth;
  //Try-Catch Block
  try {
    //Find User
    let user = await User.findOne({ _id: _id });
    //Exists
    console.log("Useradmin : ", user);
    if (user.userType === "admin") return true; //TRUE

    //Doesn't Exist
    return false; //FALSE
  } catch (err) {
    //On Error
    return false; //FALSE
  }
};

const isAuthenticated = async (req) => {
  //Destructure req.auth
  let { _id } = req.auth;
  //Try-Catch Block
  try {
    //Find User
    let user = await User.findOne({ _id: _id });
    //Exists
    console.log("Userauth : ", user);
    if (user) return true; //TRUE

    //Doesn't Exist
    return false; //FALSE
  } catch (err) {
    //On Error
    return false; //FALSE
  }
};

const updateUser = async (req, res) => {
  // Destructure req.params
  let id = req.params.id; // Assign the value of req.params.id directly
  console.log(req.body);

  // Destructure req.body
  let {cart } = req.body;

  // Try-Catch Block
  try {
    // Find User
    let user = await User.findById(id);

    // Check if user exists
    if (user) {
      // Update User
  
      user.cart = cart;
      console.log(cart);

      // Save User
      await user.save();

      // Send user as response
      res.json(user);
    } else {
      // If user doesn't exist
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    // On Error
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Exporting Functions
export {
  signIn,
  signup,
  loggout,
  verifyToken,
  checkAuthorization,
  isSignedIn,
  isAdmin,
  isAuthenticated,
  updateUser,
};
