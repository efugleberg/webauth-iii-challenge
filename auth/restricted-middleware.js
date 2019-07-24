const jwt = require("jsonwebtoken");

const secrets = require('../config/secrets.js')


/////   Auth Middleware provided by TOKENS.

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  //  No need for this if there is a sepearate file defining jwtSecret
//   const jwtSecret = process.env.JWT_SECRET || "secret secret, i got a secret";

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "you shall not pass" });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token provided" });
  }
};
