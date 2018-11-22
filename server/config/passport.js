var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

passport.use(
  new LocalStrategy(async function(username, password, done) {
    try {
      let user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, {
          message: "Your username is invalid"
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Your password is invalid"
        });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

module.exports = passport;
