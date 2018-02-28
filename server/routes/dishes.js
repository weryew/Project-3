const express = require("express");
const router = express.Router();
const Dish = require("../models/dish");
const Recipe = require("../models/recipe");
const Restaurant = require("../models/restaurant");

//get all the dishes with the name:dishname
router.get("/:query", (req, res, next) => {
  const query = req.params.query.toUpperCase();
  Dish.find({}, (err, results) => {
    if (err) {
      next(err);
    }
    const dishes = results.filter(dish => {
      return dish.name.toUpperCase().indexOf(query) !== -1;
    });
    console.log(dishes);
    res.json(dishes);
  });
});

//get details of the dish
router.get("/oneDish/:dishId", (req, res, next) => {
  const id = req.params.dishId;
  Dish.findById(id, (err, dish) => {
    if (err) {
      next(err);
    }
    res.json(dish);
  });
});

//get a recipe of the dish
router.get("/:dishId/recipe", (req, res, next) => {
  Recipe.find({ _dish: req.params.dishId }, (err, recipe) => {
    if (err) {
      next(err);
    }
    res.json(recipe);
  });
});

//get all the restaurants which prepare the dish
router.get("/:dishId/restaurants", (req, res, next) => {
  Restaurant.find({ _dish: req.params.dishId }, (err, restaurants) => {
    if (err) {
      next(err);
    }
    res.json(restaurants);
  });
});

//get details of one restaurant
router.get("/oneRest/:restId", (req, res, next) => {
  Restaurant.findById(req.params.restId, (err, rest) => {
    if (err) {
      next(err);
    }
    res.json(rest);
  });
});

//add a review to a recipe
// router.post("/:dishId/:recipeId", (req, res, next) => {
//   Recipe.findById(req.params.recipeId, (err, recipe) => {
//     if (err) {
//       next(err);
//     }
//     const review = res.body.review;
//     const recipeWithReview = new recipe({
//       recipe
//     });
//   });
// });
module.exports = router;
