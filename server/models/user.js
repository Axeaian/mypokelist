const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    required: [true, "cannot be blank"]
  },
  country: String,
  dob: Date,
  email: {
    type: String,
    unique: true,
    required: [true, "cannot be blank"]
  },
  passwordHash: String,
  passwordSalt: String,
  pokemon: Array
});

userSchema.methods.setPassword = function(password) {
  this.passwordSalt = generateSalt();
  this.passwordHash = hashPassword(password, this.passwordSalt);
};
function generateSalt() {
  let salt = crypto.randomBytes(16).toString("Hex");
  return salt;
}

function hashPassword(password, salt) {
  let hashed = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("Hex");
  return hashed;
}

userSchema.methods.validPassword = function(password) {
  return this.passwordHash === hashPassword(password, this.passwordSalt);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
