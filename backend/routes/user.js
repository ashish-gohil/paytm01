const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User } = require("../models/user");
const { JWT_SECRET } = require("../config");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");
const { Account } = require("../models/accouts");

const router = express.Router();

const zodUserSchema = z.object({
  username: z.string().email({ message: "Invalid username/email address" }),
  firstname: z.string({
    required_error: "firstname is required",
    invalid_type_error: "firstname must be a string",
  }),
  lastname: z.string({
    required_error: "lastname is required",
    invalid_type_error: "lastname must be a string",
  }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

const signInZodSchema = z.object({
  username: z.string().email({ message: "Invalid username/email address" }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

const updateUserZodSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.post("/signup", async (req, res) => {
  const username = req.body?.username;
  const firstname = req.body?.firstname;
  const lastname = req.body?.lastname;
  const password = req.body?.password;
  console.log("inside signup");
  try {
    const safeParsedBody = zodUserSchema.safeParse({
      username,
      password,
      firstname,
      lastname,
    });
    console.log(password);
    if (!safeParsedBody.success) {
      return res.status(411).json({
        message: "Incorrect inputs",
        error: safeParsedBody.error?.issues?.[0]?.message,
      });
    }
    const existingUser = await User.findOne({
      username,
      password,
      firstname,
      lastname,
    });
    if (existingUser) {
      return res.status(411).json({
        message: "Existing User",
      });
    }
    const newUser = new User({
      username,
      firstname,
      lastname,
      password,
    });
    const response = await newUser.save();
    if (response) {
      const newAccount = new Account({
        userId: response._id,
        balance: Math.floor(Math.random() * 1001),
      });
      await newAccount.save();
      const token = jwt.sign({ userId: response._id }, JWT_SECRET);
      return res.status(200).json({
        token,
        message: "User created successfully",
      });
    } else {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      // Handle validation errors
      const validationErrors = {};
      for (const key in err.errors) {
        validationErrors[key] = err.errors[key].message;
      }
      return res.status(411).json({
        message: validationErrors || "Internal Server Error!",
      });
    } else {
      console.log(err);
      // Handle other errors
      // console.error("Error saving user:", err);
      return res.status(500).json({
        message: "Error saving user",
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const { success } = signInZodSchema.safeParse({ username, password });
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
    const signedUser = await User.findOne({ username, password });
    console.log(signedUser);
    console.log("signedUser is above");
    if (signedUser) {
      const token = jwt.sign({ userId: signedUser._id }, JWT_SECRET);
      return res.status(200).json({ token });
    } else {
      return res.status(411).json({
        message: "Invalid User name or Password",
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const newPass = req.body.password;
  const newFname = req.body.firstname;
  const newLname = req.body.lastname;
  const userId = req.userId;
  try {
    const { success } = updateUserZodSchema.safeParse({
      password: newPass,
      firstname: newFname,
      lastname: newLname,
    });
    if (!success) {
      return res.status(411).json({ msg: "Error while updating information" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        password: newPass,
        firstname: newFname,
        lastname: newLname,
      }
    );
    if (updatedUser) {
      return res.status(200).json({
        message: "Updated successfully",
      });
    } else {
      return res.status(411).json({
        msg: "Error While updating User!",
      });
    }
  } catch (err) {
    res.status(411).json({
      msg: err.message || "Internal Server Error",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const flt = req.query.filter;
  try {
    const filteredResults = await User.find({
      $or: [
        { firstname: { $regex: flt, $options: "i" } },
        { lastname: { $regex: flt, $options: "i" } },
      ],
    });
    if (filteredResults) {
      return res.status(200).json({
        users: filteredResults.map(
          ({ username, firstname, lastname, _id }) => ({
            _id,
            username,
            firstname,
            lastname,
          })
        ),
      });
    }
    return res.status(411).json({
      msg: "Error finding Results!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Internal Server Error!",
    });
  }
});

module.exports = router;
