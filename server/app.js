const express = require("express");
const app = express();
const passport = require("passport");
var User = require("./models/user");
const cors = require("cors");

var corsOptions = {
  origin: [/http:\/\/localhost:.*/, /http[s]*:\/\/.*.herokuapp.com/],
  credentials: true
};

require("dotenv").config();

app.use(express.json());
app.use(cors(corsOptions));
var expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//routes
const user = require("./routes/user");
app.use("/user", user);

module.exports = app;
