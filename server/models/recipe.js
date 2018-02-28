const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  ingredients: Array,
  cookTime: String,
  prepTime: String,
  Tools: Array,
  Reviews: Object,
  _dish: {
    type: Schema.Types.ObjectId,
    ref: "Dish"
  }
});
module.exports = mongoose.model("Recipe", recipeSchema);
