const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"]
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
