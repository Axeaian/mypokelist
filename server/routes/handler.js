const User = require("../models/user");
const crypto = require("crypto");
const { mailer } = require("../config/sendgrid");

async function registerNewUser(req, res) {
  let existUser = await User.findOne({ username: req.body.username });
  let existEmail = await User.findOne({ email: req.body.email });
  if (!existUser && !existEmail) {
    var user = new User();
    user.username = req.body.username;
    user.dob = req.body.dob;
    user.country = req.body.country;
    user.email = req.body.email;
    user.setPassword(req.body.username, req.body.password);
    user.authenticated = false;
    user.verifcode = crypto.randomBytes(16).toString("Hex");

    await user.save();
    mailer(user.username, user.email, user.verifcode);
    return res.status(201).json({
      user: `${user.username}`,
      message: `Created user with username: ${user.username}`
    });
  }
  if (existUser) {
    return res.status(401).json({
      message: "Username exist!\nPlease try again with another username"
    });
  }
  if (existEmail) {
    return res.status(401).json({
      message: "Email exist! \nPlease login instead."
    });
  }
}

module.exports = { registerNewUser };
