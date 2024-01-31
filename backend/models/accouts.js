const mongoose = require("mongoose");
const { connection } = require("../db");
const accountsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});
const Account = connection.model("Account", accountsSchema);
module.exports = { Account };
