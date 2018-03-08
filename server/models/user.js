const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"]
  },
  meetupsCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup"
    }
  ],
  meetupsJoined: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meetup"
    }
  ],
  recipesCommented: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ],
  restosCommented: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
