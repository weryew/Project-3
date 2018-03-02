const express = require("express");
const passport = require("passport");
const router = express.Router();
const Dish = require("../models/dish");
const Recipe = require("../models/recipe");
const Restaurant = require("../models/restaurant");
const config = require("../config");

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
    // const dishes = rest.dishes.forEach(dish => {
    //   Dish.findById(dish._dish, (err, dish) => {
    //     if (err) throw err;
    //   });
    // });
    // console.log(dishes);
    res.json(rest);
  });
});

//add a reviewto a recipe
router.post(
  "/:dishId/recipeReview",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    Recipe.findOne({ _dish: req.params.dishId }, (err, recipe) => {
      if (err) return next(err);
      recipe.ratings = recipe.ratings || [];
      const rating = recipe.ratings.find(r => r._user.equals(req.user._id));
      const comment = recipe.ratings.find(r => r._user.equals(req.user._id));
      if (rating && comment) {
        rating.value = req.body.rating;
        rating.comment = req.body.comment;
      } else {
        recipe.ratings.push({
          _user: req.user._id,
          value: req.body.rating,
          comment: req.body.comment
        });
      }
      let s = 0;
      recipe.ratings.forEach(r => {
        s = s + parseInt(r.value);
      });
      recipe.average = s / recipe.ratings.length;

      recipe.save(err => {
        if (err) return next(err);
        res.json(recipe);
      });
    });
  }
);

//get all the reviews
router.get("/:dishId/reviews", (req, res, next) => {
  Recipe.findOne({ _dish: req.params.dishId }, (err, recipe) => {
    if (err) return next(err);

    res.json(recipe.ratings);
  });
});

module.exports = router;
