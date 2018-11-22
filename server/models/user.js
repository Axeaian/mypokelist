const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  country: String,
  dob: Date,
  email: String,
  pokemon: Array
});

userSchema.methods.validPassword = function(password) {
  return this.password === password;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
