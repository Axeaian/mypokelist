const express = require("express");
const passport = require("passport");
const path = require("path");
const uuid = require("uuid/v4");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();
var User = require("./models/user");

const staticFiles = express.static(path.join(__dirname, "../client/build"));
app.use(staticFiles);

require("dotenv").config();

app.use(express.json());
app.use(
  session({
    genid: req => uuid(),
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//routes
const user = require("./routes/user");
app.use("/user", user);
app.get("/verify", async function(req, res) {
  console.log(req.query.hash);
  if (req.query.hash) {
    const user = await User.findOne({ verifcode: req.query.hash });
    user.authenticated = true;
    user.save();
    user
      ? res.status(200).json({ message: `Verified` })
      : res.status(404).json({ message: `Invalid hash` });
  } else {
    res.status(200).json({ message: `Invalid query params` });
  }
});

//To resolve React-Router client side routing. Put all API calls above this route!
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = app;
