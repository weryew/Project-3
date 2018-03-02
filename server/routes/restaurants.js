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
  console.log("add resto");
  const { name, url, address, photo, _dish } = req.body;
  const restaurant = new Restaurant({
    name,
    url,
    address,
    photo,
    _dish
  });
  Restaurant.create(restaurant, err => {
    if (err) return next(err);
    res.json(restaurant);
    console.log(restaurant);
  });
});
module.exports = router;
