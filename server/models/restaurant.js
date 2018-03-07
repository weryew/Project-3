const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const arrayUniquePlugin = require("mongoose-unique-array");

const ratingSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
    // unique: true
  },
  comment: String,
  value: {
    type: Number,
    min: 1,
    max: 5
  }
});

// const meetupSchema = new Schema({
//   title: String,
//   photo: String,
//   address: String,
//   date: Date,
//   created: Date,
//   person: Number,
//   creator: {
//     name: String,
//     creatorId: {
//       type: Schema.Types.ObjectId,
//       ref: "User"
//     }
//   }
// });

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
