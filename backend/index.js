const express = require("express");
const cors = require("cors");
const PORT = 3000;
const rootRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json()); // to parse body
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Backend is UP at port ${PORT}`);
});
