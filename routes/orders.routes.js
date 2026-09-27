const express = require("express");
const router = express.Router();
const Carpet = require("../models/Carpet");
const isSignedIn = require("../middleware/is-signed-in");
const isAdmin = require("../middleware/is-admin");
const { model } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const order = require("../models/order");

router.get("/", isSignedIn, async (req, res) => {
  try {
    const myOrder = await order
      .find({ customer: req.session.User._id })
      .populate("carpet");
    res.render("ordersList.ejs", { myOrder });
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});

module.exports = router;
