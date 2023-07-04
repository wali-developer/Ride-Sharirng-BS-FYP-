const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.send("Access Denied");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.send("Invalid Token");
    }
  }
};

module.exports = verifyToken;
