const mongoose = require("mongoose");
const express = require("express");
const { Account } = require("../models/accouts");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const transferFunds = async (fromAccId, toAccId, amount, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const options = { session, new: true };
    const updatedFromAcc = await Account.findOneAndUpdate(
      {
        userId: fromAccId,
        balance: { $gte: amount },
      },
      {
        $inc: {
          balance: -amount,
        },
      },
      options
    );

    if (!updatedFromAcc) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const updatedToAcc = await Account.findOneAndUpdate(
      {
        userId: toAccId,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      options
    );

    if (!updatedToAcc) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    await session.commitTransaction(); // to commit a transfer happen in DB
    session.endSession();
    // console.log("UpdatedFrom Acc");
    // console.log(updatedFromAcc);
    // console.log("UpdatedTo Acc");
    // console.log(updatedToAcc);
    return res.status(200).json({
      message: "Transfer successful",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log("Aborted Message: ", err.message);
    return res
      .status(400)
      .json({ msg: err.message || "Internal Server Error!" });
  }
};

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const userAccount = await Account.findOne({ userId });
    if (userAccount) {
      return res.status(200).json({
        balance: userAccount.balance,
      });
    } else {
      return res.status(404).json({
        msg: "Invalid UserId",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Internal Server Error!",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const fromUserId = req.userId;
  const toUserId = req.body.to;
  const amount = req.body.amount;

  transferFunds(fromUserId, toUserId, amount, res);
});

module.exports = router;
