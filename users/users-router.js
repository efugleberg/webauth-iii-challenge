const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const secret = require('../config/secrets.js')

router.get("/", restricted, (req, res) => {
    console.log(req.jwtToken);
    console.log('secret', secret.jwtSecret);
  const department = req.jwtToken.department;
  Users.find(department)
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
