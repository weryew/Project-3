const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  dishPrice: String,
  address: {
    lat: Number,
    lng: Number
  },
  contacts: Object,
  url: String,
  reviews: Object,
  _dish: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
