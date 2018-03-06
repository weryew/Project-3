const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  title: String,
  address: String,
  date: Date,
  created: String,
  person: Number,
  dish: {
    name: String,
    photo: String
  }
});

module.exports = mongoose.model("Meetup", meetupSchema);
