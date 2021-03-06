const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

console.log("Value of MONGODB_URI>>>", process.env.MONGODB_URI);

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Database is connected");
});

db.on("error", error => {
  console.error("An error has occured", error);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
