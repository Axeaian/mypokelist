const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(
  "mongodb://localhost/pokemon",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Database is connected");
});

db.on("error", error => {
  console.error("An error has occured", error);
});

const server = app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
