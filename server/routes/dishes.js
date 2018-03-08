const express = require("express");
const passport = require("passport");
const router = express.Router();
const Dish = require("../models/dish");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const Restaurant = require("../models/restaurant");
const Meetup = require("../models/meetup");
const config = require("../config");
const multer = require("multer");
const upload = multer({
  dest: "./public/uploads/"
});
//get all the dishes with the name:dishname
router.get("/dishes/:query", (req, res, next) => {
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
router.get("/dishes/oneDish/:dishId", (req, res, next) => {
  const id = req.params.dishId;
  Dish.findById(id, (err, dish) => {
    if (err) {
      next(err);
    }
    res.json(dish);
  });
});

//get a recipe of the dish
router.get("/dishes/:dishId/recipe", (req, res, next) => {
  Recipe.find(
    {
      _dish: req.params.dishId
    },
    (err, recipe) => {
      if (err) {
        next(err);
      }
      res.json(recipe);
    }
  );
});

//get all the restaurants which prepare the dish
router.get("/dishes/:dishId/restaurants", (req, res, next) => {
  Restaurant.find(
    {
      dishes: req.params.dishId
    },
    (err, restaurants) => {
      if (err) {
        next(err);
      }
      res.json(restaurants);
    }
  );
});

//get details of one restaurant
router.get("/dishes/oneRest/:restId", (req, res, next) => {
  Restaurant.findById(req.params.restId, (err, rest) => {
    if (err) {
      next(err);
    }
    res.json(rest);
  });
});

//add a review to a recipe
router.post(
  "/dishes/:dishId/recipeReview",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    Recipe.findOne(
      {
        _dish: req.params.dishId
      },
      (err, recipe) => {
        if (err) return next(err);
        console.log(recipe);
        recipe.ratings = recipe.ratings || [];
        const rating = recipe.ratings.find(rating =>
          rating._user.equals(req.user._id)
        );

        const comment = recipe.ratings.find(r => r._user.equals(req.user._id));
        if (rating && comment) {
          rating.value = req.body.value;
          rating.comment = req.body.comment;
          rating.date = new Date();
        } else {
          recipe.ratings.push({
            _user: req.user._id,
            value: req.body.value,
            comment: req.body.comment,
            date: new Date(),
            name: req.user.name,
            photo: req.user.photo
          });
        }

        let s = 0;
        recipe.ratings.forEach(r => {
          s = s + parseInt(r.value);
        });
        recipe.average = s / recipe.ratings.length * 20;

        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: {
              recipesCommented: recipe._id
            }
          },
          (err, user) => {
            if (err) return next(err);
            recipe.save(err => {
              if (err) return next(err);
              res.json(recipe);
            });
          }
        );
      }
    );
  }
);

//get all the reviews of a recipe
router.get(
  "/dishes/:dishId/reviews",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    Recipe.findOne(
      {
        _dish: req.params.dishId
      },
      (err, recipe) => {
        if (err) return next(err);
        console.log(recipe);
        res.json(recipe);
      }
    );
  }
);

//add a review to a resto
router.post(
  "/oneRest/:restId/restoReview",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    Restaurant.findById(req.params.restId, (err, resto) => {
      if (err) return next(err);
      console.log(resto);
      resto.ratings = resto.ratings || [];
      const rating = resto.ratings.find(rating =>
        rating._user.equals(req.user._id)
      );

      const comment = resto.ratings.find(r => r._user.equals(req.user._id));
      if (rating && comment) {
        rating.value = req.body.value;
        rating.comment = req.body.comment;
        rating.date = new Date();
      } else {
        resto.ratings.push({
          _user: req.user._id,
          value: req.body.value,
          comment: req.body.comment,
          date: new Date(),
          name: req.user.name,
          photo: req.user.photo
        });
      }

      let s = 0;
      resto.ratings.forEach(r => {
        s = s + parseInt(r.value);
      });
      resto.average = s / resto.ratings.length * 20;

      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            restosCommented: resto._id
          }
        },
        (err, user) => {
          if (err) return next(err);
          resto.save(err => {
            if (err) return next(err);
            res.json(resto);
          });
        }
      );
    });
  }
);

//get all the reviews of a restaurant
router.get(
  "/dishes/:restoId/reviewsResto",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    Restaurant.findById(req.params.restoId, (err, resto) => {
      if (err) return next(err);
      console.log(resto);
      res.json(resto);
    });
  }
);

//add a dish
router.post("/dishes/newDish", upload.single("photo"), (req, res, next) => {
  const { name, description } = req.body;
  const dish = new Dish({
    name,
    photo: `/uploads/${req.file.filename}`,
    description
  });
  Dish.create(dish, err => {
    if (err) return next(err);
    res.json(dish);
  });
});

//add dishes to a new resto
router.post("/dishes/oneRest/:restId", (req, res, next) => {
  const dishId = req.body.dishId;
  Restaurant.findByIdAndUpdate(
    req.params.restId,
    {
      $push: {
        dishes: dishId
      }
    },
    (err, restaurant) => {
      console.log(restaurant);
      // restaurant.save(err => {
      if (err) return next(err);
      res.json(restaurant);
      // });
    }
  );
});

// function checkRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       //to be checked
//       res.redirect("/");
//     } else next();
//   };
// }

router.post("/restaurants", upload.single("photo"), (req, res, next) => {
  console.log("DEBUG req.file", req.file);

  const photo = `/uploads/${req.file.filename}`;
  const { name, url, address, fullAddress } = req.body;
  const restaurant = new Restaurant({
    name,
    url,
    address,
    photo,
    fullAddress
  });
  Restaurant.create(restaurant, err => {
    if (err) {
      console.log("create", err);
      return next(err);
    }
    res.json(restaurant);
  });
});

//get all meetups
router.get("/restaurants/meetups", (req, res, next) => {
  Meetup.find({}, (err, results) => {
    if (err) return next(err);
    console.log(results);
    res.json(results);
  });
});

//get meetups for a resto
router.get("/oneRest/:restId/meetups", (req, res, next) => {
  Restaurant.findById(req.params.restId)
    .populate("meetups")
    .exec((err, resto) => {
      if (err) return next(err);

      res.json(resto.meetups);
    });
});
//add a meetup
router.post(
  "/oneRest/:restId/addMeetup",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const { title, date, created, person, address, creator, photo } = req.body;
    const meetup = new Meetup({
      title,
      date,
      created,
      person,
      address,
      creator,
      photo
    });

    Restaurant.findByIdAndUpdate(
      req.params.restId,
      {
        $push: {
          meetups: meetup
        }
      },
      (err, restaurant) => {
        if (err) return next(err);

        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: {
              meetupsCreated: meetup
            }
          },
          (err, user) => {
            if (err) return next(err);

            Meetup.create(meetup, err => {
              if (err) return next(err);
              res.json(meetup);
            });
          }
        );
      }
    );
  }
);

//join a meetup
router.post(
  `/oneRest/addPerson`,
  passport.authenticate("jwt", config.jwtSession),
  (req, res, next) => {
    const meetupId = req.body.meetupId;
    Meetup.findByIdAndUpdate(
      meetupId,
      {
        $inc: {
          person: 1
        }
      },
      (err, meetup) => {
        if (err) return next(err);
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: {
              meetupsJoined: meetup
            }
          },
          (err, user) => {
            if (err) return next(err);
            res.json(meetup);
          }
        );
      }
    );
  }
);
//get all the meetups joined and created by the user
router.get(
  "/userPage",
  passport.authenticate("jwt", config.jwtSession),
  (req, res, err) => {
    User.findById(req.user._id)
      .populate("meetupsJoined")
      .populate("meetupsCreated")
      .populate({
        path: "recipesCommented",
        populate: {
          path: "_dish",
          model: "Dish"
        }
      })
      .populate("restosCommented")
      .exec((err, user) => {
        if (err) return next(err);
        console.log(user);
        res.json(user);
      });
  }
);

module.exports = router;
