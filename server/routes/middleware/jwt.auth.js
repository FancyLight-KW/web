const jwt = require("jsonwebtoken");

exports.authChecker = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        res.status(401).json({ error: "Auth Error from authChecker" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Auth Error from authChecker" });
  }
};
