const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: String,
  photo: String,
  description: String
});

module.exports = mongoose.model("Dish", dishSchema);
