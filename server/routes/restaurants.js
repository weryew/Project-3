const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const Meetup = require("../models/meetup");
var mongoose = require("mongoose");
// function checkRole(role) {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       //to be checked
//       res.redirect("/");
//     } else next();
//   };
// }

router.post("/restaurants", (req, res, next) => {
  const { name, url, address, photo, fullAddress } = req.body;
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

router.post("/oneRest/:restId/addMeetup", (req, res, next) => {
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
  Meetup.create(meetup, err => {
    if (err) return next(err);
    res.json(meetup);
  });
  Restaurant.findByIdAndUpdate(
    req.params.restId,
    { $push: { meetups: meetup } },
    (err, restaurant) => {
      if (err) return next(err);
    }
  );
});

router.post(`/oneRest/addPerson`, (req, res, next) => {
  const meetupId = req.body.meetupId;
  Meetup.findByIdAndUpdate(meetupId, { $inc: { person: 1 } }, (err, meetup) => {
    if (err) return next(err);
    res.json(meetup);
    console.log(meetup);
  });
});

module.exports = router;
