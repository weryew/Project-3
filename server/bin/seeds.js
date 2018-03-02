const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/coolAParis");
const Dish = require("../models/dish");
const Recipe = require("../models/recipe");
const Restaurant = require("../models/restaurant");
const dishes = [
  {
    name: "Couscous with fish",
    photo:
      "http://www.nutritionbyangelique.net/wp-content/uploads/2016/05/Moroccan-Fish-main.jpg",
    description: "Delicious food"
  }
];
const recipes = [
  {
    ingredients: ["meat", "vegetables"],
    cookTime: "1hour",
    prepTime: "30min",
    tools: "knife",
    ratings: null,
    average: null,
    _dish: "5a959161374f1a1e6f9483b6"
  }
];
const restaurants = [
  {
    name: "Sidi Bou",
    photo:
      "https://u.tfstatic.com/restaurant_photos/678/68678/169/612/sidi-bou-said-salle-59e72.jpg",
    url: "https://sidi-bou.com/",

    _dish: "5a959161374f1a1e6f9483b6",
    address: {
      lat: 48.85661400000001,
      lng: 2.3522219000000177
    }
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
