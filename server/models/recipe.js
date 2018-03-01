const mongoose = require("mongoose");
const arrayUniquePlugin = require("mongoose-unique-array");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  value: {
    type: Number,
    min: 1,
    max: 5
  }
});

const recipeSchema = new Schema({
  ingredients: Array,
  cookTime: String,
  prepTime: String,
  Tools: Array,
  Reviews: Object,
  ratings: [ratingSchema],
  _dish: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  }
});
recipeSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model("Recipe", recipeSchema);
