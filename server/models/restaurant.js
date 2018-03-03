const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const arrayUniquePlugin = require("mongoose-unique-array");

// const reviewSchema = new Schema({
//   _user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     unique: true
//   },
//   comment: String,
//   value: {
//     type: Number,
//     min: 1,
//     max: 5
//   }
// });

const restaurantSchema = new Schema({
  name: String,
  address: Object,
  photo: String,
  url: String,
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish"
    }
  ]
  //  reviews: [reviewSchema]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
