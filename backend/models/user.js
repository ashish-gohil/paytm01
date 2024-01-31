const mongoose = require("mongoose");
const { connection } = require("../db");
// const { transferFunds } = require("../routes/account");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
    match: [
      passwordRegex,
      "Password must have at least 6 characters, one lowercase letter, one uppercase letter, one number, and one special character.",
    ],
  },
});
const User = connection.model("User", userSchema);
module.exports = { User };
