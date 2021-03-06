var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

passport.use(
  "login",
  new LocalStrategy(async function(username, password, done) {
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return done(null, false, {
          message:
            "Username invalid!\nPlease check login credentials and try again."
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message:
            "Password invalid!\nPlease check login credentials and try again."
        });
      }
      if (!user.authenticated) {
        return done(null, false, {
          message:
            "User is not validated!\nPlease check your email to validate and try again."
        });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

module.exports = passport;
