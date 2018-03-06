const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// function checkRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       //to be checked
//       res.redirect("/");
//     } else next();
//   };
// }

router.post("/restaurants", (req, res, next) => {
  const { name, url, address, photo } = req.body;
  const restaurant = new Restaurant({
    name,
    url,
    address,
    photo
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
router.get("/meetups", (req, res, next) => {
  Restaurant.find({}, (results, err) => {
    if (err) return next(err);
    const meetups = [];
    results.forEach(restaurant => {
      return meetups.push(restaurant.meetups);
    });
    res.json(meetups);
  });
});

// router.get("dishes/oneRest/:restId/getMeetups", (req, res, next) => {
//   Restaurant.findById(req.params.restId, (err, restaurant) => {
//     if (err) {
//       next(err);
//     }
//     res.json(restaurant.meetups);
//   });
// });

router.post("dishes/oneRest/:restId/addMeetup", (req, res, newt) => {
  const { title, date, created, person, dish } = req.body;
  const meetup = { title, date, created, person, dish };
  Restaurant.findByIdAndUpdate(
    req.params.restId,
    { $push: { meetups: meetup } },
    (err, restaurant) => {
      if (err) return next(err);
      restaurant.save(err => {
        if (err) return next(err);
        res.json(meetup);
      });
    }
  );
});

module.exports = router;
