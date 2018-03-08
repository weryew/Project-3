const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const arrayUniquePlugin = require("mongoose-unique-array");

const ratingSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  comment: String,
  value: {
    type: Number,
    min: 1,
    max: 5
  },
  date: Date,
  name: String,
  photo: String
});

const restaurantSchema = new Schema({
  name: String,
  address: Object,
  fullAddress: String,
  photo: String,
  url: String,
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish"
    }
  ],
  ratings: [ratingSchema],
  meetups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup"
    }
  ],
  average: Number
});
restaurantSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model("Restaurant", restaurantSchema);
