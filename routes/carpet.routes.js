const express = require("express");
const router = express.Router();
const Carpet = require("../models/Carpet");
const isSignedIn = require("../middleware/is-signed-in");
const isAdmin = require("../middleware/is-admin");
const { model } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const AllCarpets = await Carpet.find();
    res.render("carpetList.ejs", { AllCarpets });
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});

router.get("/new", isAdmin, (req, res) => {
  res.render("createCarpet.ejs");
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const defaultValue = 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
    const createCarpet = await Carpet.create({
      name: req.body.name,
      type: req.body.type,
      origin: req.body.origin,
      thickness: req.body.thickness,
      material: req.body.material,
      fixedLength: req.body.fixedLength,
      fixedWidth: req.body.fixedWidth,
      imageUrl: req.body.imageUrl || defaultValue,
      stockQuantity: req.body.stockQuantity,
      price: req.body.price,
      isAvailable: req.body.isAvailable === "on",
    });
    res.redirect("/carpets");
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});

module.exports = router;
