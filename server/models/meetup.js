const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  title: String,
  photo: String,
  address: String,
  date: Date,
  created: Date,
  person: Number,
  creator: {
    name: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }
});
module.exports = mongoose.model("Meetup", meetupSchema);
