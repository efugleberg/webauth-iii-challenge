const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); //  2 ^ 10
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
});

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const jwtSecret = process.env.JWT_SECRET || "secret secret, i got a secret";

  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = router;
