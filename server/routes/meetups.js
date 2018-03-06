const express = require("express");
const router = express.Router();
const Meetup = require("../models/meetup");

router.get("/meetups", (res, req, next) => {
  Meetup.find({}, (results, err) => {
    if (err) return next(err);
    res.json(results);
  });
});

module.exports = router;
