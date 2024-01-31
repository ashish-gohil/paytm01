const mongoose = require("mongoose");
const dbName = "paytm-v1";
mongoose
  .connect(
    `mongodb+srv://ashishGohil14:8Ypi6PCjqtG3.px@cluster0.lb1adev.mongodb.net/${dbName}`
  )
  .then(() => {
    console.log("DB is connected!");
    require("./models/user");
  })
  .catch((err) => {
    console.log("There is some error connecting DB!");
  });

module.exports = { connection: mongoose.connection };
