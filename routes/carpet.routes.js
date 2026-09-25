const express = require("express");
const router = express.Router();
const Carpet = require("../models/Carpet");
const isSignedIn = require("../middleware/is-signed-in");
const isAdmin = require("../middleware/is-admin");
const { model } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");

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

router.post("/", isAdmin, upload.single("image"), async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      imageUrl =
        "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80";
    }
    const createCarpet = await Carpet.create({
      name: req.body.name,
      type: req.body.type,
      origin: req.body.origin,
      thickness: req.body.thickness,
      material: req.body.material,
      fixedLength: req.body.fixedLength,
      fixedWidth: req.body.fixedWidth,
      imageUrl: imageUrl,
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

router.get("/:carpetsId", async (req, res) => {
  const foundCarpet = await Carpet.findById(req.params.carpetsId).populate();
  res.render("Carpets-details.ejs", { foundCarpet });
});

router.get("/:carpetsId/edit", isAdmin, async (req, res) => {
  const foundCarpet = await Carpet.findById(req.params.carpetsId).populate();
  res.render("Edit-Details.ejs", { foundCarpet });
});

router.delete("/:carpetsId", isAdmin, async (req, res) => {
  try {
    await Carpet.findByIdAndDelete(req.params.carpetsId);
    res.redirect("/carpets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting carpet");
  }
});

router.put("/:carpetsId", isAdmin, upload.single("image"), async (req, res) => {
  try {
    const existingCarpet = await Carpet.findById(req.params.carpetsId);
    if (!existingCarpet) {
      return res.status(404).send("Carpet not found");
    }

    let imageUrl = existingCarpet.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await Carpet.findByIdAndUpdate(req.params.carpetsId, {
      name: req.body.name,
      type: req.body.type,
      origin: req.body.origin,
      thickness: req.body.thickness,
      material: req.body.material,
      fixedLength: req.body.fixedLength || 0,
      fixedWidth: req.body.fixedWidth || 0,
      imageUrl: imageUrl,
      stockQuantity: req.body.stockQuantity || 0,
      price: req.body.price,
      isAvailable: req.body.isAvailable === "on",
    });

    res.redirect(`/carpets/${req.params.carpetsId}`);
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});
module.exports = router;
