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
  const { name, url, address, photo, dishes } = req.body;
  const restaurant = new Restaurant({
    name,
    url,
    address,
    photo,
    dishes
  });
  Restaurant.create(restaurant, err => {
    if (err) return next(err);
    res.json(restaurant);
  });
});

module.exports = router;
