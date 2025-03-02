const mongoose = require("mongoose");

async function connectDB(port) {
  return mongoose.connect(port).then((e) => console.log("Mongoose connected"));
}

module.exports = connectDB;
