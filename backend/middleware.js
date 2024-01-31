const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "Bearer Token is required!",
    });
  }
  const token = auth.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).json({ msg: "Invalid Token" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};
module.exports = { authMiddleware };
