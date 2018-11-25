const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const handleAsyncError = require("express-async-wrap");
const handler = require("./handler");
const User = require("../models/user");

//get user listing
router.get("/list", isLoggedIn, async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: `${err.message}` });
  }
});

//create user
router.post("/signup", handleAsyncError(handler.registerNewUser));

//login user
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info) {
      return res.status(401).json({ message: info.message });
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        user: `${req.user.username}`,
        message: `You are logged in!`
      });
    });
  })(req, res, next);
});

router.post("/tests");

//get fav pokemon
router.get("/fav", isLoggedIn, async function(req, res) {
  try {
    const result = await User.findById(req.user.id);
    res.status(200).json(`${req.user.pokemon}`);
  } catch (err) {
    res.status(400).json({ message: `${err.message}` });
  }
});

//add fav pokemon
router.put("/fav", isLoggedIn, async function(req, res) {
  let update = req.body.pokemon;
  let user = await User.findById(req.user.id);
  if (update.length > 2 && user.pokemon.indexOf(update) === -1) {
    console.log(update.length);
    user.pokemon.push(update);
  } else if (update.length > 2) {
    let loc = user.pokemon.indexOf(update);
    user.pokemon.splice(loc, 1);
  } else {
    console.log("pokemon is not added as name length is shorter than 3");
  }
  await User.findByIdAndUpdate(req.user.id, { pokemon: user.pokemon });
  return res.status(200).json(`${user.pokemon}`);
});

//logout user
router.get("/logout", function(req, res) {
  req.logout();
  res.json({
    status: "logout",
    msg: "Please Log In again"
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.send("Please login");
  //res.status(401) => FE link to login using router redirect
}

module.exports = router;
