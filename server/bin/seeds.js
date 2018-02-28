const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/coolAParis");
const Dish = require("../models/dish");
const Recipe = require("../models/recipe");
const Restaurant = require("../models/restaurant");
const dishes = [
  {
    name: "Couscous",
    photo: "recent photo",
    description: "Delicious food"
  }
];
const recipes = [
  {
    ingredients: ["meat", "vegetables"],
    cookTime: "1hour",
    prepTime: "30min",
    _dish: "5a959161374f1a1e6f9483b6"
  }
];
const restaurants = [
  {
    name: "Sidi Bou",
    Address: "rue de laFayette",
    _dish: "5a959161374f1a1e6f9483b6"
  }
];

Dish.create(dishes, (err, docs) => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});
Recipe.create(recipes, (err, docs) => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});
Restaurant.create(restaurants, (err, docs) => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});
