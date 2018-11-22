const User = require("../models/user");

async function registerNewUser(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.dob = req.body.dob;
  user.country = req.body.country;
  user.email = req.body.email;

  await user.save();
  return res.status(201).json(`Created user with username: ${user.username}`);
}

module.exports = { registerNewUser };
